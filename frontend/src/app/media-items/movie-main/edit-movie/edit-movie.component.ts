import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../../services/movie.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http'; // Import for error handling

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['../../../css/edit-media.component.css'],
  imports: [FormsModule, CommonModule],
  standalone: true,
})
export class EditMovieComponent implements OnInit {
  movie: any = {
    id: null,
    title: '',
    completedDate: '',
    imageUrl: '',
  };
  newImageUrl: string = ''; // Holds the new image URL entered by the user
  isLoading: boolean = true; // Flag to show a loading state
  errorMessage: string | null = null; // Holds error messages, if any

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    // Get the ID from the route parameters
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.errorMessage = 'No ID provided for the movie.';
      this.isLoading = false;
      return;
    }

    // Fetch the movie by ID
    this.movieService.getMovieById(id).subscribe(
      (data) => {
        this.movie = data;
        this.isLoading = false;
      },
      (error: HttpErrorResponse) => { // Explicit type for error
        this.errorMessage = 'Failed to load the movie.';
        this.isLoading = false;
        console.error('Error loading movie:', error.message);
      }
    );
  }

  onSave(): void {
    // Update the image URL if a new one is provided
    if (this.newImageUrl) {
      this.movie.imageUrl = this.newImageUrl;
    }

    // Make the REST call to update the movie
    this.movieService.updateMovie(this.movie.id, this.movie).subscribe(
      (updatedMovie) => {
        console.log('Movie updated:', updatedMovie);
        this.router.navigate(['/movies']); // Navigate back to the list page
      },
      (error: HttpErrorResponse) => { // Explicit type for error
        this.errorMessage = 'Failed to update the movie.';
        console.error('Error updating movie:', error.message);
      }
    );
  }

  onCancel(): void {
    // Navigate back to the movie list page
    this.router.navigate(['/movies']);
  }

  updatePreview(): void {
    console.log('Preview updated with URL:', this.newImageUrl);
  }
}
