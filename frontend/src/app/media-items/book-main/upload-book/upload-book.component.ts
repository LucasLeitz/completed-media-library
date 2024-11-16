import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../../services/book.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-upload-book',
  templateUrl: './upload-book.component.html',
  styleUrl: '../../../css/upload-media.component.css',
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class UploadBookComponent {
  includeImage: boolean = false;
  foundImageUrl: boolean = true;

  item = {
    title: '',
    imageUrl: '',
    completedDate: ''
  };

  constructor(private bookService: BookService, private router: Router) {}

  searchForImage() {
    if (!this.item.title) {
      alert('Please enter the book title first!');
      return;
    }
    const formattedTitle = this.item.title.replace(/ /g, '_');

    this.bookService.searchWikipediaImage(formattedTitle).subscribe(
      (response: { imageUrl: string | null }) => {
        this.item.imageUrl = response.imageUrl || '';
        if (this.item.imageUrl === '') {
          this.foundImageUrl = false;
        }
      },
      (error: HttpErrorResponse) => {
        console.error('Error searching Wikipedia:', error);
        this.item.imageUrl = '';
        this.foundImageUrl = false;
      }
    );
  }

  onSubmit() {
    const formattedDate = this.item.completedDate
      ? new Date(this.item.completedDate).toISOString().split('T')[0]
      : null;

    const bookToSave = {
      ...this.item,
      completedDate: formattedDate,
    };

    this.bookService.addBook(bookToSave).pipe(
      catchError((error) => {
        console.error('Error adding book:', error);
        return of(null);
      })
    ).subscribe({
      next: (response: any) => {
        if (response) {
          console.log('Book added successfully:', response);
          this.router.navigate(['/books']);
        }
      },
      error: (error: any) => console.error('Error:', error),
      complete: () => console.log('Request complete'),
    });
  }

  onCancel() {
    this.router.navigate(['/books']);
  }
}
