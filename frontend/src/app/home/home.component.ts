import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaService } from '../services/media.service';
import { MediaType } from '../models/media.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class HomeComponent implements OnInit {
  totalBooks = 0;
  totalMovies = 0;
  totalTvShows = 0;
  totalVideoGames = 0;

  completedBooksCount: number | null = null;
  completedMoviesCount: number | null = null;
  completedTvShowsCount: number | null = null;
  completedVideoGamesCount: number | null = null;

  currentYear = new Date().getFullYear();

  constructor(private mediaService: MediaService) {}

  ngOnInit(): void {
    this.loadTotalCounts();
    this.loadCompletedCounts();
  }

  loadTotalCounts(): void {
    this.mediaService.getByType(MediaType.BOOK).subscribe({
      next: (books) => this.totalBooks = books.filter(b => b.status === 'COMPLETED').length,
      error: (err) => console.error('Error fetching books:', err),
    });

    this.mediaService.getByType(MediaType.MOVIE).subscribe({
      next: (movies) => this.totalMovies = movies.filter(m => m.status === 'COMPLETED').length,
      error: (err) => console.error('Error fetching movies:', err),
    });

    this.mediaService.getByType(MediaType.TV_SHOW).subscribe({
      next: (shows) => this.totalTvShows = shows.filter(s => s.status === 'COMPLETED').length,
      error: (err) => console.error('Error fetching tv shows:', err),
    });

    this.mediaService.getByType(MediaType.VIDEO_GAME).subscribe({
      next: (games) => this.totalVideoGames = games.filter(g => g.status === 'COMPLETED').length,
      error: (err) => console.error('Error fetching video games:', err),
    });
  }

  loadCompletedCounts(): void {
    this.mediaService.getCompletedCountForYear(MediaType.BOOK, this.currentYear).subscribe({
      next: (count) => (this.completedBooksCount = count),
      error: (err) => console.error('Error fetching completed books:', err),
    });

    this.mediaService.getCompletedCountForYear(MediaType.MOVIE, this.currentYear).subscribe({
      next: (count) => (this.completedMoviesCount = count),
      error: (err) => console.error('Error fetching completed movies:', err),
    });

    this.mediaService.getCompletedCountForYear(MediaType.TV_SHOW, this.currentYear).subscribe({
      next: (count) => (this.completedTvShowsCount = count),
      error: (err) => console.error('Error fetching completed tv shows:', err),
    });

    this.mediaService.getCompletedCountForYear(MediaType.VIDEO_GAME, this.currentYear).subscribe({
      next: (count) => (this.completedVideoGamesCount = count),
      error: (err) => console.error('Error fetching completed video games:', err),
    });
  }
}



