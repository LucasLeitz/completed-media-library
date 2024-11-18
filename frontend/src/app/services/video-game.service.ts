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

  getCompletedCountForYear(year: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/completed/count/${year}`);
  }

  getVideoGameById(id: string): Observable<VideoGame> {
    return this.http.get<VideoGame>(`${this.baseUrl}/${id}`);
  }

  updateVideoGame(id: number, videoGame: VideoGame): Observable<VideoGame> {
    return this.http.put<VideoGame>(`${this.baseUrl}/${id}`, videoGame);
  }

}
