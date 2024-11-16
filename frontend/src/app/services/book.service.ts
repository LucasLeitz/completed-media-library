import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private baseUrl = 'http://localhost:8080/api/books';

  constructor(private http: HttpClient) {}

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.baseUrl);
  }

  addBook(book: { title: string }): Observable<any> {
    return this.http.post(this.baseUrl, book);
  }

  searchWikipediaImage(title: string): Observable<{ imageUrl: string | null }> {
    return this.http.get<{ imageUrl: string | null }>(`${this.baseUrl}/searchWikipediaImage`, {
      params: { title },
    });
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
