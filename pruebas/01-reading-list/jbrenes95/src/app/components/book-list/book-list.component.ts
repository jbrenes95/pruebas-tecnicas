import { Component, OnInit } from '@angular/core';
import { JsonDataService } from 'src/shared/json-data.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  constructor(private jsonDateService: JsonDataService) { }

  ngOnInit(): void {







    this.jsonDateService.getDataFromJson().subscribe((jsonData) => {
      console.log(jsonData);
    });
  }
}
