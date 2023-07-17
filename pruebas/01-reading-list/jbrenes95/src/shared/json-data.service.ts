import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Book, Library, Root } from '../models/books';

@Injectable({
  providedIn: 'root',
})
export class JsonDataService {
  constructor(private http: HttpClient) {}

  private dataSubject: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public data$: Observable<any> = this.dataSubject.asObservable();

  getDataFromJson(): void {
    this.http.get<any>('assets/books.json').subscribe(({ library }) => {
      const books = this.mappingBooks(library);
      this.updateData(books);
    });
  }

  mappingBooks(library: any): any {
    return library.map(({ book }: { book: any }) => book);
  }

  updateData(newData: any): void {
    this.dataSubject.next(newData);
  }
}
