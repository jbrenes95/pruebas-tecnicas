import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { StorageService } from './storage.service';
import { Book } from 'src/models/books';

@Injectable({
  providedIn: 'root',
})
export class JsonDataService {
  private booksAvailables: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public booksAvailables$: Observable<any> =
    this.booksAvailables.asObservable();

  private booksNoSelected = new BehaviorSubject<number>(0);
  booksNoSelected$ = this.booksNoSelected.asObservable();

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
  ) {
    window.addEventListener('storage', (event: any) => {
      if (event.key === 'Books') {
        const newData = event.newValue ? JSON.parse(event.newValue) : [];

        this.booksAvailables.next(newData);
      }
      if (event.key === 'Counter') {
        const newData = event.newValue;
        this.booksNoSelected.next(newData);
      }
    });
  }

  getBooksFromJson(): void {
    this.http
      .get<any>('assets/books.json')
      .pipe(
        map(({ library }: any) => {
          return library.map(({ book }: { book: any }) => {
            book.selected = false;
            return book;
          });
        }),
      )
      .subscribe((books) => {
        this.booksAvailables.next(books);
        this.updateCounterBooksNoSelected(books);
      });
  }

  updateCounterBooksNoSelected(books: Book[]) {
    const counterBooks = books.filter((book) => !book.selected).length;
    this.storageService.setStorage('Counter', counterBooks);
    this.booksNoSelected.next(counterBooks);
  }

  getAvailableBooksObservable(): Observable<any> {
    return this.booksAvailables$;
  }

  getCounterBooksNoSelected(): Observable<any> {
    return this.booksNoSelected$;
  }

  deleteAvailableBook(newData: any): void {
    this.storageService.setStorage('Books', newData);
    this.booksAvailables.next(newData);
  }

  addAvailableBook(newBook: Book) {
    const { ISBN } = newBook;
    const booksAvailables = this.booksAvailables.getValue();

    const updateBookAvailable = this.updateBookAvailableWithISBN(
      booksAvailables,
      ISBN,
    );
    this.booksAvailables.next(updateBookAvailable);
    this.updateCounterBooksNoSelected(updateBookAvailable);
  }

  updateBookAvailableWithISBN(booksAvailable: Book[], ISBN: string): Book[] {
    return booksAvailable.map((bookAvailable: Book) => {
      if (bookAvailable.ISBN === ISBN) {
        return { ...bookAvailable, selected: false };
      }
      return bookAvailable;
    });
  }
}
