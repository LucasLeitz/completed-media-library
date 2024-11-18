import { Component } from '@angular/core';
import { TvShowService } from '../../../services/tv-show.service';
import { TvShow } from '../../../models/tv-show.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tv-show-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tv-show.component.html',
  styleUrl: '../../../css/media.component.css'
})
export class TvShowComponent {
  tvShows: TvShow[] = [];
  filteredTvShows: TvShow[] = [];
  flippedCards: boolean[] = [];
  searchTerm: string = '';
  showSearch: boolean = false;
  showSortOptions: boolean = false;
  sortCriteria: string = 'title';

  constructor(
    private tvShowService: TvShowService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tvShowService.getAllTvShows().subscribe((data) => {
      this.tvShows = data;
      this.filteredTvShows = data;
      this.flippedCards = this.tvShows.map(() => false);
    });
  }

  toggleSortOptions(): void {
    this.showSortOptions = !this.showSortOptions;
  }

  sortTvShows(): void {
    const sorted = [...this.filteredTvShows];
    switch (this.sortCriteria) {
      case 'title':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'completedDate':
        sorted.sort((a, b) => (a.completedDate || '').localeCompare(b.completedDate || ''));
        break;
    }
    this.filteredTvShows = sorted;
  }

  toggleSearch(): void {
    this.showSearch = !this.showSearch;
    if (!this.showSearch) {
      this.resetFilter();
    }
  }

  filterTvShows(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredTvShows = this.tvShows;
    } else {
      this.filteredTvShows = this.tvShows.filter(tvShow =>
        tvShow.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  resetFilter(): void {
    this.searchTerm = '';
    this.filteredTvShows = this.tvShows;
  }

  flipCard(index: number): void {
    this.flippedCards[index] = !this.flippedCards[index];
  }

  removeTvShow(index: number): void {
    const tvShowToRemove = this.filteredTvShows[index];
    if (!tvShowToRemove || !tvShowToRemove.id) {
      console.error("Invalid TV show or missing ID:", tvShowToRemove);
      return;
    }

    if (confirm('Are you sure you want to remove this TV show?')) {
      this.tvShowService.deleteTvShow(tvShowToRemove.id).subscribe({
        next: () => {
          this.tvShows = this.tvShows.filter(tvShow => tvShow.id !== tvShowToRemove.id);
          this.filteredTvShows = this.filteredTvShows.filter(tvShow => tvShow.id !== tvShowToRemove.id);
        },
        error: (err) => {
          console.error('Failed to delete the TV show:', err);
          alert('Could not delete the TV show. Please try again.');
        },
      });
    }
  }

  addTvShow(): void {
    this.router.navigate(['/add-tv-show']);
  }

  // Navigate to the "Edit Tv Show" page
  editTvShow(index: number): void {
    if (index < 0 || index >= this.filteredTvShows.length) {
      console.error(`Index out of range: ${index}`);
      return;
    }

    const tvShowToEdit = this.filteredTvShows[index];
    if (!tvShowToEdit?.id) {
      console.error(`Invalid tv show or missing ID for tv show at index ${index}:`, tvShowToEdit);
      return;
    }

    this.router.navigate(['/edit-tv-show', tvShowToEdit.id]);
  }

}
