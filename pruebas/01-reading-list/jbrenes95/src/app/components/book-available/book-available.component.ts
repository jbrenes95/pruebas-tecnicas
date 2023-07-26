import { Component, Input, OnInit } from '@angular/core';
import { Book } from 'src/models/books';
import { BookListService } from 'src/shared/book-list.service';
import { JsonDataService } from 'src/shared/json-data.service';

@Component({
  selector: 'app-book-available',
  templateUrl: './book-available.component.html',
  styleUrls: ['./book-available.component.scss'],
})
export class BookAvailableComponent implements OnInit {
  @Input() library: Book[] = [];
  public counterSelectedLibrary: number = 0;
  constructor(
    private jsonDateService: JsonDataService,
    private bookListService: BookListService,
  ) {}
  ngOnInit(): void {
    this.jsonDateService.booksNoSelected$.subscribe(
      (booksCounter) => (this.counterSelectedLibrary = booksCounter),
    );
  }

  deleteLibraryBook(book: Book) {
    book.selected = true;
    this.jsonDateService.updateCounterBooksNoSelected(this.library);
    this.bookListService.updateBooksList(book);
  }
}
