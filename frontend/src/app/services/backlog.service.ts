import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Backlog } from '../models/backlog.model';

@Injectable({
  providedIn: 'root',
})
export class BacklogService {
  private baseUrl = 'http://localhost:8080/api/backlogs';

  constructor(private http: HttpClient) {}

  getAllBacklogs(): Observable<Backlog[]> {
    return this.http.get<Backlog[]>(this.baseUrl);
  }

  addBacklog(backlog: { imageUrl: string; title: string; type: string }): Observable<Backlog> {
    return this.http.post<Backlog>(this.baseUrl, backlog);
  }

  getBacklogsByType(type: string): Observable<Backlog[]> {
    const url = `${this.baseUrl}?type=${type}`;
    return this.http.get<Backlog[]>(url);
  }

  searchWikipediaImage(title: string): Observable<{ imageUrl: string | null }> {
    return this.http.get<{ imageUrl: string | null }>(`${this.baseUrl}/searchWikipediaImage`, {
      params: { title },
    });
  }

  deleteBacklog(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

}
