import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { MovieService } from '../services/movie.service';
import { TvShowService } from '../services/tv-show.service';
import { VideoGameService } from '../services/video-game.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: []
})
export class HomeComponent implements OnInit {
  totalBooks: number = 0;
  totalMovies: number = 0;
  totalTvShows: number = 0;
  totalVideoGames: number = 0;

  constructor(
    private bookService: BookService,
    private movieService: MovieService,
    private tvShowService: TvShowService,
    private videoGameService: VideoGameService
  ) {}

  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe((books) => {
      this.totalBooks = books.length;
    });

    this.movieService.getAllMovies().subscribe((movies) => {
      this.totalMovies = movies.length;
    });

    this.tvShowService.getAllTvShows().subscribe((tvShows) => {
      this.totalTvShows = tvShows.length;
    });

    this.videoGameService.getAllVideoGames().subscribe((videoGames) => {
      this.totalVideoGames = videoGames.length;
    });
  }
}

