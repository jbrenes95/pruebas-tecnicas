import { Component, Input } from '@angular/core';
import { Book } from 'src/models/books';
import { BookListService } from 'src/shared/book-list.service';
import { JsonDataService } from 'src/shared/json-data.service';

@Component({
  selector: 'app-book-available',
  templateUrl: './book-available.component.html',
  styleUrls: ['./book-available.component.scss'],
})
export class BookAvailableComponent {
  @Input() library: Book[] = [];

  constructor(
    private jsonDateService: JsonDataService,
    private bookListService: BookListService,
  ) {}

  deleteLibraryBook(event: Book) {
    const filterBooks = this.library.filter(
      (books) => books.ISBN != event.ISBN,
    );
    this.bookListService.updateBooksList(event);
    this.jsonDateService.deleteAvailableBook(filterBooks);
  }
}
