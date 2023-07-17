import { Component, OnInit } from '@angular/core';
import { Book } from 'src/models/books';
import { JsonDataService } from 'src/shared/json-data.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  public library: Book[] = [];
  constructor(private jsonDateService: JsonDataService) {}

  ngOnInit(): void {
    this.jsonDateService.getDataFromJson();
    this.jsonDateService.data$.subscribe((books) => {
      this.library = books;
    });
  }
}
