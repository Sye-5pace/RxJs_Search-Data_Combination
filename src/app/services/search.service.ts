import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor() {}

  // Simulate an API call to search
  search(term: string): Observable<string[]> {
    const mockResults = ['apple', 'banana', 'cherry', 'date', 'elderberry']
      .filter(fruit => fruit.includes(term));

    return of(mockResults).pipe(delay(500));
  }

  // Simulate an API call to get user details
  getUserDetails(): Observable<{ id: number; name: string; email: string }> {
    const userDetails = { id: 1, name: 'John Doe', email: 'john.doe@example.com' };
    return of(userDetails).pipe(delay(700));
  }

  // Simulate an API call to get user posts
  getUserPosts(): Observable<{ userId: number; title: string; content: string }[]> {
    const userPosts = [
      { userId: 1, title: 'First Post', content: 'This is the content of the first post.' },
      { userId: 1, title: 'Second Post', content: 'This is the content of the second post.' }
    ];
    return of(userPosts).pipe(delay(800));
  }
}
