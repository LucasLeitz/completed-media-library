import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TvShow } from '../models/tv-show.model';

@Injectable({
  providedIn: 'root',
})
export class TvShowService {
  private baseUrl = 'http://localhost:8080/api/tvshows';

  constructor(private http: HttpClient) {}

  getAllTvShows(): Observable<TvShow[]> {
    return this.http.get<TvShow[]>(this.baseUrl);
  }

  addTvShow(tvShow: { title: string }): Observable<any> {
    return this.http.post(this.baseUrl, tvShow);
  }

  searchWikipediaImage(title: string): Observable<{ imageUrl: string | null }> {
    return this.http.get<{ imageUrl: string | null }>(`${this.baseUrl}/searchWikipediaImage`, {
      params: { title },
    });
  }

  deleteTvShow(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getCompletedCountForYear(year: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/completed/count/${year}`);
  }
}
