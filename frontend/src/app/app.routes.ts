import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { MediaComponent } from './media-items/media-main/media/media.component';
import { UploadMediaComponent } from './media-items/media-main/upload-media/upload-media.component';
import { EditMediaComponent } from './media-items/media-main/edit-media/edit-media.component';
import { MediaBacklogComponent } from './media-items/media-main/media-backlog/media-backlog.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

  // Media list views
  { path: 'books', component: MediaComponent, data: { mediaType: 'BOOK' } },
  { path: 'movies', component: MediaComponent, data: { mediaType: 'MOVIE' } },
  { path: 'tv-shows', component: MediaComponent, data: { mediaType: 'TV_SHOW' } },
  { path: 'video-games', component: MediaComponent, data: { mediaType: 'VIDEO_GAME' } },

  // Upload routes (completed and backlog)
  { path: 'add-book', component: UploadMediaComponent, data: { mediaType: 'BOOK', status: 'COMPLETED' } },
  { path: 'add-book/backlog', component: UploadMediaComponent, data: { mediaType: 'BOOK', status: 'BACKLOG' } },

  { path: 'add-movie', component: UploadMediaComponent, data: { mediaType: 'MOVIE', status: 'COMPLETED' } },
  { path: 'add-movie/backlog', component: UploadMediaComponent, data: { mediaType: 'MOVIE', status: 'BACKLOG' } },

  { path: 'add-tv-show', component: UploadMediaComponent, data: { mediaType: 'TV_SHOW', status: 'COMPLETED' } },
  { path: 'add-tv-show/backlog', component: UploadMediaComponent, data: { mediaType: 'TV_SHOW', status: 'BACKLOG' } },

  { path: 'add-video-game', component: UploadMediaComponent, data: { mediaType: 'VIDEO_GAME', status: 'COMPLETED' } },
  { path: 'add-video-game/backlog', component: UploadMediaComponent, data: { mediaType: 'VIDEO_GAME', status: 'BACKLOG' } },

  // Backlog views
  { path: 'books/backlog', component: MediaBacklogComponent, data: { mediaType: 'BOOK' } },
  { path: 'movies/backlog', component: MediaBacklogComponent, data: { mediaType: 'MOVIE' } },
  { path: 'tv-shows/backlog', component: MediaBacklogComponent, data: { mediaType: 'TV_SHOW' } },
  { path: 'video-games/backlog', component: MediaBacklogComponent, data: { mediaType: 'VIDEO_GAME' } },

  // Edit media
  { path: 'edit-media/:id', component: EditMediaComponent }
];


