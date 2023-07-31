import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Book } from 'src/models/books';
import { BookListService } from 'src/shared/book-list.service';
import { JsonDataService } from 'src/shared/json-data.service';

@Component({
  selector: 'app-book-available',
  templateUrl: './book-available.component.html',
  styleUrls: ['./book-available.component.scss'],
})
export class BookAvailableComponent implements OnInit {
  private library$: Subscription = new Subscription();
  private counterSelectedLibrary$: Subscription = new Subscription();
  public library: Book[] = [];
  public counterSelectedLibrary: number = 0;

  constructor(
    private jsonDateService: JsonDataService,
    private bookListService: BookListService,
  ) {}

  ngOnInit(): void {
    this.counterSelectedLibrary$ = this.jsonDateService
      .getCounterBooksNoSelected()
      .subscribe((booksCounter) => {
        this.counterSelectedLibrary = booksCounter;
      });

    this.library$ = this.jsonDateService
      .getAvailableBooksObservable()
      .subscribe((books) => {
        this.library = books;
      });
  }

  deleteLibraryBook(book: Book) {
    book.selected = true;
    this.jsonDateService.deleteAvailableBook(this.library);
    this.jsonDateService.updateCounterBooksNoSelected(this.library);
    this.bookListService.updateBooksList(book);
  }

  ngOnDestroy(): void {
    this.library$.unsubscribe();
    this.counterSelectedLibrary$.unsubscribe();
  }
}
