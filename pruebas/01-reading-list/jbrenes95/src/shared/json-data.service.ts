import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class JsonDataService {
  private booksAvailables: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public booksAvailables$: Observable<any> =
    this.booksAvailables.asObservable();

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
  ) {
    window.addEventListener('storage', (event: any) => {
      if (event.key === 'Books') {
        const newData = JSON.parse(event.newValue);
        this.booksAvailables.next(newData);
      }
    });
  }

  getBooksFromJson(): void {
    this.http
      .get<any>('assets/books.json')
      .pipe(
        map(({ library }: any) => {
          return library.map(({ book }: { book: any }) => book);
        }),
      )
      .subscribe((books) => {
        this.setBooks(books);
      });
  }

  getBooksObservable(): Observable<any[]> {
    return this.booksAvailables$;
  }

  setBooks(newData: any) {
    this.booksAvailables.next(newData);
  }

  updateBook(newData: any): void {
    this.storageService.setStorage('Books', newData);
    this.booksAvailables.next(newData);
  }
}
