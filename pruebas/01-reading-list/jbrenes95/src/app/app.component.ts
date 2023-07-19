import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Book } from 'src/models/books';
import { BookListService } from 'src/shared/book-list.service';
import { JsonDataService } from 'src/shared/json-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private library$: Subscription = new Subscription();
  public library: Book[] = [];
  public bookList: Book[] = [];

  constructor(
    private jsonDateService: JsonDataService,
    private bookListService: BookListService,
  ) {}

  ngOnInit(): void {
    this.jsonDateService.getBooksFromJson();
    this.library$ = this.jsonDateService
      .getAvailableBooksObservable()
      .subscribe((books) => {
        this.library = books;
      });

    this.bookListService.getBooksListObservable().subscribe((bookListNow) => {
      this.bookList = bookListNow;
    });
  }

  ngOnDestroy(): void {
    this.library$.unsubscribe();
  }
}
