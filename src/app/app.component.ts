import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { SearchService } from './services/search.service';
import { debounceTime, switchMap, filter, distinctUntilChanged, combineLatest, map, catchError, finalize } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';

interface UserDetails {
  id: number;
  name: string;
  email: string;
}

interface UserPost {
  userId: number;
  title: string;
  content: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'RxJs_Search_Data_Combination';

  searchControl = new FormControl('');
  results: string[] = [];
  errorMessage: string = '';
  isLoadingSearch: boolean = false;
  isLoadingCombinedData: boolean = false;
  combinedData$!: Observable<{ name: string; email: string; posts: UserPost[] }>;

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    // Task 1: Implement Debounced Search with Error Handling and Loading State
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter((term: string | null): term is string => term !== null && term.length >= 3),
      switchMap(term => {
        this.isLoadingSearch = true;
        return this.searchService.search(term).pipe(
          catchError(error => {
            this.errorMessage = 'Search error occurred!';
            return of([]);
          }),
          finalize(() => this.isLoadingSearch = false)
        );
      })
    ).subscribe(results => {
      this.results = results;
      this.errorMessage = results.length === 0 ? this.errorMessage : '';
    });

    // Task 2: Combine Data from Multiple Endpoints with Error Handling and Loading State
    this.isLoadingCombinedData = true;
    this.combinedData$ = combineLatest([
      this.searchService.getUserDetails(),
      this.searchService.getUserPosts()
    ]).pipe(
      map(([userDetails, userPosts]) => ({
        ...userDetails,
        posts: userPosts.filter((post: UserPost) => post.userId === userDetails.id)
      })),
      catchError(error => {
        this.errorMessage = 'Data combination error occurred!';
        return of({ name: '', email: '', posts: [] });
      }),
      finalize(() => this.isLoadingCombinedData = false)
    );
  }
}
