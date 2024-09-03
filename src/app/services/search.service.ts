import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor() {}

  // Simulate an API call
  search(term: string): Observable<string[]> {
    const mockResults = ['apple', 'banana', 'cherry', 'date', 'elderberry']
      .filter(fruit => fruit.includes(term));

    return of(mockResults).pipe(delay(500));
  }
}
