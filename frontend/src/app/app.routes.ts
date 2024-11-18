import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { VideoGameComponent } from './media-items/video-game-main/video-game/video-game.component';
import { BookComponent } from './media-items/book-main/book/book.component';
import { MovieComponent } from './media-items/movie-main/movie/movie.component';
import { TvShowComponent } from './media-items/tv-show-main/tv-show/tv-show.component';

import { UploadVideoGameComponent } from './media-items/video-game-main/upload-video-game/upload-video-game.component';
import { UploadTvShowComponent } from './media-items/tv-show-main/upload-tv-show/upload-tv-show.component';
import { UploadMovieComponent } from './media-items/movie-main/upload-movie/upload-movie.component';
import { UploadBookComponent } from './media-items/book-main/upload-book/upload-book.component';

import { EditBookComponent } from './media-items/book-main/edit-book/edit-book.component';
import { EditMovieComponent } from './media-items/movie-main/edit-movie/edit-movie.component';
import { EditTvShowComponent } from './media-items/tv-show-main/edit-tv-show/edit-tv-show.component';
import { EditVideoGameComponent } from './media-items/video-game-main/edit-video-game/edit-video-game.component';

export const routes: Routes = [

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

  { path: 'video-games', component: VideoGameComponent },
  { path: 'books', component: BookComponent },
  { path: 'movies', component: MovieComponent },
  { path: 'tv-shows', component: TvShowComponent },

  { path: 'add-tv-show', component: UploadTvShowComponent },
  { path: 'add-movie', component: UploadMovieComponent },
  { path: 'add-video-game', component: UploadVideoGameComponent },
  { path: 'add-book', component: UploadBookComponent },

  { path: 'edit-tv-show/:id', component: EditTvShowComponent },
  { path: 'edit-movie/:id', component: EditMovieComponent },
  { path: 'edit-video-game/:id', component: EditVideoGameComponent },
  { path: 'edit-book/:id', component: EditBookComponent },

];

