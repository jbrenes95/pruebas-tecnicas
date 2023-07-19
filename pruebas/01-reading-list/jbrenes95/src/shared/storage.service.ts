import { Injectable } from '@angular/core';
import { Book } from 'src/models/books';
import { JsonDataService } from './json-data.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  setStorage(key: string, data: Book[]) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getStorage(key: string): any {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }
}
