import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { SearchService } from './services/search.service';
import { debounceTime, switchMap, filter, distinctUntilChanged, combineLatest, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

// Define types for user details and posts
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
  combinedData$!: Observable<{ name: string; email: string; posts: UserPost[] }>;

  constructor(private searchService: SearchService) {
    // Task 1: Implement Debounced Search
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter((term: string | null): term is string => term !== null && term.length >= 3),
      switchMap(term => this.searchService.search(term))
    ).subscribe(results => this.results = results);
  }

  ngOnInit() {
    // Task 2: Combine Data from Multiple Endpoints using combineLatest operator
    this.combinedData$ = combineLatest([
      this.searchService.getUserDetails(),
      this.searchService.getUserPosts()
    ]).pipe(
      map(([userDetails, userPosts]) => ({
        ...userDetails,
        posts: userPosts.filter((post: UserPost) => post.userId === userDetails.id)
      }))
    );
  }
}
