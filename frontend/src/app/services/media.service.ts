import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Media, MediaStatus, MediaType } from '../models/media.model';
import { environment } from '../../../../src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private apiUrl = `${environment.apiBaseUrl}/api/media`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Media[]> {
    return this.http.get<Media[]>(this.apiUrl);
  }

  getById(id: number): Observable<Media> {
    return this.http.get<Media>(`${this.apiUrl}/${id}`);
  }

  getByType(type: MediaType): Observable<Media[]> {
    return this.http.get<Media[]>(`${this.apiUrl}/type/${type}`);
  }

  add(media: Media): Observable<Media> {
    return this.http.post<Media>(this.apiUrl, media);
  }

  update(id: number, media: Media): Observable<Media> {
    return this.http.put<Media>(`${this.apiUrl}/${id}`, media);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  searchWikipediaImage(title: string): Observable<{ imageUrl: string | null }> {
    const params = new HttpParams().set('title', title);
    return this.http.get<{ imageUrl: string | null }>(`${this.apiUrl}/searchWikipediaImage`, { params });
  }

  getCompletedCountForYear(type: MediaType, year: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/type/${type}/completed/count/${year}`);
  }

  getByTypeAndStatus(type: MediaType, status: MediaStatus): Observable<Media[]> {
    return this.http.get<Media[]>(`${this.apiUrl}/type/${type}/status/${status}`);
  }


}

