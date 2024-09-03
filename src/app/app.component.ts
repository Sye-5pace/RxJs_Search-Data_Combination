import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { SearchService } from './services/search.service';
import { debounceTime, switchMap, filter, distinctUntilChanged } from 'rxjs/operators';
import { CommonModule } from '@angular/common';;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'RxJs_Search_Data_Combination';

  searchControl = new FormControl('');
  results: string[] = [];


  constructor(private searchService: SearchService) {
    //Task 1: Implement Debounced Search
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter((term: string | null): term is string => term !== null && term.length >= 3),
      switchMap(term => this.searchService.search(term))
    ).subscribe(results => this.results = results);
  }
}
