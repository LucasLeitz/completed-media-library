import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private baseUrl = 'http://localhost:8080/api/movies';

  constructor(private http: HttpClient) {}

  getAllMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.baseUrl);
  }

  addMovie(movie: { title: string }): Observable<any> {
    return this.http.post(this.baseUrl, movie);
  }

  searchWikipediaImage(title: string): Observable<{ imageUrl: string | null }> {
    return this.http.get<{ imageUrl: string | null }>(`${this.baseUrl}/searchWikipediaImage`, {
      params: { title },
    });
  }

  deleteMovie(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
