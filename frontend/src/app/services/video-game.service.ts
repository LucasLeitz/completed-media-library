import { Injectable } from '@angular/core';
import { VideoGame } from '../models/video-game.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoGameService {
  private baseUrl = 'http://localhost:8080/api/videogames';

  constructor(private http: HttpClient) {}

  getAllVideoGames(): Observable<VideoGame[]> {
    return this.http.get<VideoGame[]>(this.baseUrl);
  }

  addVideoGame(videoGame: { title: string; platform: string }): Observable<any> {
    return this.http.post(this.baseUrl, videoGame);
  }

  searchWikipediaImage(title: string): Observable<{ imageUrl: string | null }> {
    return this.http.get<{ imageUrl: string | null }>(`${this.baseUrl}/searchWikipediaImage`, {
      params: { title }
    });
  }

  deleteVideoGame(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

}
