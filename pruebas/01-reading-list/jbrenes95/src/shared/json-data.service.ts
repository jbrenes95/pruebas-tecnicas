import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Book, Library, Root } from '../models/books';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class JsonDataService {
  private dataSubject: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public data$: Observable<any> = this.dataSubject.asObservable();

  constructor(private http: HttpClient) {
    window.addEventListener('storage', (event: any) => {
      console.log(event);

      if (event.key === 'Books') {
        const newData = JSON.parse(event.newValue);
        console.log(newData);

        this.dataSubject.next(newData);
      }
    });
  }

  getDataFromJson(): void {
    this.http.get<any>('assets/books.json').subscribe(({ library }) => {
      const books = this.mappingBooks(library);
      this.setBooks(books);
    });
  }

  getDataObservable(): Observable<any[]> {
    return this.dataSubject.asObservable();
  }

  mappingBooks(library: any): any {
    return library.map(({ book }: { book: any }) => book);
  }

  setBooks(newData: any) {
    this.dataSubject.next(newData);
  }

  updateData(newData: any): void {
    localStorage.setItem('Books', JSON.stringify(newData));
    this.dataSubject.next(newData);
  }
}
