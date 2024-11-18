import { Component } from '@angular/core';
import { MovieService } from '../../../services/movie.service';
import { Movie } from '../../../models/movie.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './movie.component.html',
  styleUrl: '../../../css/media.component.css'
})
export class MovieComponent {
  movies: Movie[] = [];
  filteredMovies: Movie[] = [];
  flippedCards: boolean[] = [];
  searchTerm: string = '';
  showSearch: boolean = false;
  showSortOptions: boolean = false;
  sortCriteria: string = 'title';

  constructor(
    private movieService: MovieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.movieService.getAllMovies().subscribe((data) => {
      this.movies = data;
      this.filteredMovies = data;
      this.flippedCards = this.movies.map(() => false);
    });
  }

  toggleSortOptions(): void {
    this.showSortOptions = !this.showSortOptions;
  }

  sortMovies(): void {
    const sorted = [...this.filteredMovies];
    switch (this.sortCriteria) {
      case 'title':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'completedDate':
        sorted.sort((a, b) => (a.completedDate || '').localeCompare(b.completedDate || ''));
        break;
    }
    this.filteredMovies = sorted;
  }

  toggleSearch(): void {
    this.showSearch = !this.showSearch;
    if (!this.showSearch) {
      this.resetFilter();
    }
  }

  filterMovies(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredMovies = this.movies;
    } else {
      this.filteredMovies = this.movies.filter(movie =>
        movie.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  resetFilter(): void {
    this.searchTerm = '';
    this.filteredMovies = this.movies;
  }

  flipCard(index: number): void {
    this.flippedCards[index] = !this.flippedCards[index];
  }

  removeMovie(index: number): void {
    const movieToRemove = this.filteredMovies[index];
    if (!movieToRemove || !movieToRemove.id) {
      console.error("Invalid movie or missing ID:", movieToRemove);
      return;
    }

    if (confirm('Are you sure you want to remove this movie?')) {
      this.movieService.deleteMovie(movieToRemove.id).subscribe({
        next: () => {
          this.movies = this.movies.filter(movie => movie.id !== movieToRemove.id);
          this.filteredMovies = this.filteredMovies.filter(movie => movie.id !== movieToRemove.id);
        },
        error: (err) => {
          console.error('Failed to delete the movie:', err);
          alert('Could not delete the movie. Please try again.');
        },
      });
    }
  }

  addMovie(): void {
    this.router.navigate(['/add-movie']);
  }

  // Navigate to the "Edit Movie" page
  editMovie(index: number): void {
    if (index < 0 || index >= this.filteredMovies.length) {
      console.error(`Index out of range: ${index}`);
      return;
    }

    const movieToEdit = this.filteredMovies[index];
    if (!movieToEdit?.id) {
      console.error(`Invalid movie or missing ID for movie at index ${index}:`, movieToEdit);
      return;
    }

    this.router.navigate(['/edit-movie', movieToEdit.id]);
  }

}
