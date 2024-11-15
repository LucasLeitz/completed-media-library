import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VideoGameListComponent } from './video-game/video-game-list.component';
import { UploadVideoGameComponent } from './upload-video-game/upload-video-game.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'video-games', component: VideoGameListComponent},
  { path: 'add-video-game', component: UploadVideoGameComponent },
];

