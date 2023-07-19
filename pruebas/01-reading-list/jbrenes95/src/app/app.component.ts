import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Book } from 'src/models/books';
import { JsonDataService } from 'src/shared/json-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private library$: Subscription = new Subscription();
  public library: Book[] = [];
  public booksLength: number = 0;

  constructor(private jsonDateService: JsonDataService) {}

  ngOnInit(): void {
    this.jsonDateService.getBooksFromJson();
    this.library$ = this.jsonDateService
      .getBooksObservable()
      .subscribe((books) => {
        this.booksLength = books.length;
        this.library = books;
      });
  }

  ngOnDestroy(): void {
    this.library$.unsubscribe();
  }
}
