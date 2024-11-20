import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { MovieService } from '../services/movie.service';
import { TvShowService } from '../services/tv-show.service';
import { VideoGameService } from '../services/video-game.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class HomeComponent implements OnInit {
  totalBooks: number = 0;
  totalMovies: number = 0;
  totalTvShows: number = 0;
  totalVideoGames: number = 0;

  currentYear: number = new Date().getFullYear();
  completedVideoGamesCount: number | null = null;
  completedTvShowsCount: number | null = null;
  completedMoviesCount: number | null = null;
  completedBooksCount: number | null = null;

  constructor(
    private bookService: BookService,
    private movieService: MovieService,
    private tvShowService: TvShowService,
    private videoGameService: VideoGameService
  ) {}

  ngOnInit(): void {
    // Fetch total counts
    this.bookService.getAllBooks().subscribe({
      next: (books) => {
        this.totalBooks = books.length;
      },
      error: (err) => console.error('Error fetching books:', err),
    });

    this.movieService.getAllMovies().subscribe({
      next: (movies) => {
        this.totalMovies = movies.length;
      },
      error: (err) => console.error('Error fetching movies:', err),
    });

    this.tvShowService.getAllTvShows().subscribe({
      next: (tvShows) => {
        this.totalTvShows = tvShows.length;
      },
      error: (err) => console.error('Error fetching TV shows:', err),
    });

    this.videoGameService.getAllVideoGames().subscribe({
      next: (videoGames) => {
        this.totalVideoGames = videoGames.length;
      },
      error: (err) => console.error('Error fetching video games:', err),
    });

    // Fetch completed video games count
    this.loadCompletedVideoGamesCount();
    this.loadCompletedBooksCount();
    this.loadCompletedMoviesCount();
    this.loadCompletedTvShowsCount();
  }

  loadCompletedVideoGamesCount(): void {
    this.videoGameService.getCompletedCountForYear(this.currentYear).subscribe({
      next: (count) => {
        this.completedVideoGamesCount = count;
      },
      error: (err) => console.error('Error fetching completed video games count:', err),
    });
  }

  loadCompletedTvShowsCount(): void {
    this.tvShowService.getCompletedCountForYear(this.currentYear).subscribe({
      next: (count) => {
        this.completedTvShowsCount = count;
      },
      error: (err) => console.error('Error fetching completed tv shows count:', err),
    });
  }

  loadCompletedMoviesCount(): void {
    this.movieService.getCompletedCountForYear(this.currentYear).subscribe({
      next: (count) => {
        this.completedMoviesCount = count;
      },
      error: (err) => console.error('Error fetching completed movies count:', err),
    });
  }

  loadCompletedBooksCount(): void {
    this.bookService.getCompletedCountForYear(this.currentYear).subscribe({
      next: (count) => {
        this.completedBooksCount = count;
      },
      error: (err) => console.error('Error fetching completed books count:', err),
    });
  }
}


