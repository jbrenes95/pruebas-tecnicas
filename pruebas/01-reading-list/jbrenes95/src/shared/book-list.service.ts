import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from './storage.service';

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

  setBooksList(newData: any) {
    const currentBooks = this.booksListSubject.getValue();
    const joinArrays = [...currentBooks, newData];
    this.booksListSubject.next(joinArrays);
    this.storageService.setStorage('BooksList', joinArrays);
  }

  updateBookList(newData: any): void {
    this.storageService.setStorage('BooksList', newData);
    this.booksListSubject.next(newData);
  }
}
