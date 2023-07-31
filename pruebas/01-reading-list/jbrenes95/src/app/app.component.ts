import { Component, OnInit } from '@angular/core';
import { JsonDataService } from 'src/shared/json-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private jsonDateService: JsonDataService) {}

  ngOnInit(): void {
    this.jsonDateService.getBooksFromJson();
  }
}
