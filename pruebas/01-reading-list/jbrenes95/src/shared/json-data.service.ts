import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JsonDataService {
  constructor(private http: HttpClient) {}

  private dataSubject: BehaviorSubject<string[]> = new BehaviorSubject<
    string[]
  >([]);
  public data$: Observable<string[]> = this.dataSubject.asObservable();

  getDataFromJson(): Observable<any> {
    return this.http.get<any>('assets/books.json');
  }

  getData(): string[] {
    return this.dataSubject.value;
  }

  updateData(newData: string[]): void {
    this.dataSubject.next(newData);
  }
}
