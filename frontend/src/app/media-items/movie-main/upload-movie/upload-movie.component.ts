import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../../../services/movie.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-upload-movie',
  templateUrl: './upload-movie.component.html',
  styleUrl: '../../../css/upload-media.component.css',
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class UploadMovieComponent {
  includeImage: boolean = false;
  foundImageUrl: boolean = true;

  item = {
    title: '',
    imageUrl: '',
    completedDate: ''
  };

  constructor(private movieService: MovieService, private router: Router) {}

  searchForImage() {
    if (!this.item.title) {
      alert('Please enter the movie title first!');
      return;
    }
    const formattedTitle = this.item.title.replace(/ /g, '_');

    this.movieService.searchWikipediaImage(formattedTitle).subscribe(
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

    const movieToSave = {
      ...this.item,
      completedDate: formattedDate,
    };

    this.movieService.addMovie(movieToSave).pipe(
      catchError((error) => {
        console.error('Error adding movie:', error);
        return of(null);
      })
    ).subscribe({
      next: (response: any) => {
        if (response) {
          console.log('Movie added successfully:', response);
          this.router.navigate(['/movies']);
        }
      },
      error: (error: any) => console.error('Error:', error),
      complete: () => console.log('Request complete'),
    });
  }

  onCancel() {
    this.router.navigate(['/movies']);
  }
}
