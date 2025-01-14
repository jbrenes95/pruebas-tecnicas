import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { Book } from 'src/models/books';

@Injectable({
  providedIn: 'root',
})
export class BookListService {
  private booksListSubject: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public booksList$: Observable<any> = this.booksListSubject.asObservable();

  constructor(private storageService: StorageService) {
    window.addEventListener('storage', (event: any) => {
      if (event.key === 'BooksList') {
        const newData = JSON.parse(event.newValue);
        this.booksListSubject.next(newData);
      }
    });
  }

  getBookList() {
    const storageBookList = this.storageService.getStorage('BookList')
      ? JSON.parse(this.storageService.getStorage('BookList'))
      : [];
    return storageBookList;
  }

  getBooksListObservable(): Observable<any[]> {
    return this.booksList$;
  }

  updateBooksList(newData: any): void {
    const currentBooks = this.booksListSubject.getValue();
    const joinArrays = [newData, ...currentBooks];
    this.booksListSubject.next(joinArrays);
    this.storageService.setStorage('BooksList', joinArrays);
  }

  setBookList(filteredBooks: Book[]): void {
    this.storageService.setStorage('BooksList', filteredBooks);
    this.booksListSubject.next(filteredBooks);
  }
}
