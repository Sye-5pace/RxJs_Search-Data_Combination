import { Injectable } from '@angular/core';
import { of, Observable, throwError } from 'rxjs';
import { delay, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor() {}

  // Simulate an API call to search
  search(term: string): Observable<string[]> {
    if (Math.random() < 0.2) {
      return throwError(() => new Error('Search API error occurred!'));
    }
    const mockResults = ['apple', 'banana', 'cherry', 'date', 'elderberry']
      .filter(fruit => fruit.includes(term));
    return of(mockResults).pipe(
      delay(500),
      catchError(error => {
        console.error(error);
        return of([]);
      })
    );
  }

  // Simulate an API call to get user details  with error handling
  getUserDetails(): Observable<{ id: number; name: string; email: string }> {
    if (Math.random() < 0.2) {
      return throwError(() => new Error('User details API error occurred!'));
    }
    const userDetails = { id: 1, name: 'John Doe', email: 'john.doe@example.com' };
    return of(userDetails).pipe(
      delay(700),
      catchError(error => {
        console.error(error);
        return of({ id: 0, name: '', email: '' });
      })
    );
  }

  // Simulate an API call to get user posts  with error handling
  getUserPosts(): Observable<{ userId: number; title: string; content: string }[]> {
    if (Math.random() < 0.2) {
      return throwError(() => new Error('User posts API error occurred!'));
    }
    const userPosts = [
      { userId: 1, title: 'First Post', content: 'This is the content of the first post.' },
      { userId: 1, title: 'Second Post', content: 'This is the content of the second post.' }
    ];
    return of(userPosts).pipe(
      delay(800),
      catchError(error => {
        console.error(error);
        return of([]);
      })
    );
  }

}
