import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Book } from 'src/models/books';
import { JsonDataService } from 'src/shared/json-data.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  private bookList: Subscription = new Subscription();
  public library: Book[] = [];
  constructor(private jsonDateService: JsonDataService) {}

  ngOnInit(): void {
    this.jsonDateService.getDataFromJson();
    this.bookList = this.jsonDateService
      .getDataObservable()
      .subscribe((books) => {
        this.library = books;
      });
  }

  deleteLibraryBook(event: string) {
    const filterBooks = this.library.filter((books) => books.ISBN != event);
    console.log(filterBooks);

    this.jsonDateService.updateData(filterBooks);
  }

  ngOnDestroy(): void {
    this.bookList.unsubscribe();
  }
}
