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
  @Input() bookList: Book[] = [];
  constructor(
    private bookListService: BookListService,
    private jsonBookService: JsonDataService,
  ) {}
  ngOnInit(): void {}

  romeveBookToList(item: Book) {
    const filterBooksList = this.bookList.filter(
      (books) => books.ISBN != item.ISBN,
    );
    this.bookListService.setBookList(filterBooksList);
    this.jsonBookService.addAvailableBook(item);
  }
}
