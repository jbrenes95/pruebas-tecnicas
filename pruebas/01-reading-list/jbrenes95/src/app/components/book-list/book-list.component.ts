import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Book } from 'src/models/books';
import { BookListService } from 'src/shared/book-list.service';
import { JsonDataService } from 'src/shared/json-data.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  public bookList: Book[] = [];
  public counterBookList: number = 0;

  private bookList$: Subscription = new Subscription();
  private counterBookList$: Subscription = new Subscription();

  constructor(
    private bookListService: BookListService,
    private jsonBookService: JsonDataService,
  ) {}
  ngOnInit(): void {
    this.bookList$ = this.bookListService
      .getBooksListObservable()
      .subscribe((bookList) => {
        this.bookList = bookList ? bookList : [];
      });

    this.counterBookList$ = this.bookListService
      .getCounterBooksListObservable()
      .subscribe((counter) => {
        console.log(counter);

        this.counterBookList = counter;
      });
  }

  romeveBookToList(item: any) {
    const filterBooksList = this.bookList.filter(
      (books) => books.ISBN != item.item.ISBN,
    );
    this.bookListService.setBookList(filterBooksList);
    this.jsonBookService.addAvailableBook(item);
  }

  ngOnDestroy(): void {
    this.bookList$.unsubscribe();
  }
}
