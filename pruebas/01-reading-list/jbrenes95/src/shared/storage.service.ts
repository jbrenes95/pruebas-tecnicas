import { Injectable } from '@angular/core';
import { Book } from 'src/models/books';
import { JsonDataService } from './json-data.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  setStorage(data: any) {
    localStorage.setItem('Books', JSON.stringify(data));
  }

  getStorage(): any {
    const data = localStorage.getItem('miArray');
    return data ? JSON.parse(data) : [];
  }
}
