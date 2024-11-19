import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TvShowService } from '../../../services/tv-show.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http'; // Import for error handling

@Component({
  selector: 'app-edit-tv-show',
  templateUrl: './edit-tv-show.component.html',
  styleUrls: ['../../../css/edit-media.component.css'],
  imports: [FormsModule, CommonModule],
  standalone: true,
})
export class EditTvShowComponent implements OnInit {
  tvShow: any = {
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
    private tvShowService: TvShowService,
  ) {}

  ngOnInit(): void {
    // Get the ID from the route parameters
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.errorMessage = 'No ID provided for the tv show.';
      this.isLoading = false;
      return;
    }

    // Fetch the tv show by ID
    this.tvShowService.getTvShowById(id).subscribe(
      (data) => {
        this.tvShow = data;
        this.isLoading = false;
      },
      (error: HttpErrorResponse) => { // Explicit type for error
        this.errorMessage = 'Failed to load the tv show.';
        this.isLoading = false;
        console.error('Error loading tv show:', error.message);
      }
    );
  }

  onSave(): void {
    // Update the image URL if a new one is provided
    if (this.newImageUrl) {
      this.tvShow.imageUrl = this.newImageUrl;
    }

    // Make the REST call to update the tv show
    this.tvShowService.updateTvShow(this.tvShow.id, this.tvShow).subscribe(
      (updatedTvShow) => {
        console.log('Tv Show updated:', updatedTvShow);
        this.router.navigate(['/tv-shows']); // Navigate back to the list page
      },
      (error: HttpErrorResponse) => { // Explicit type for error
        this.errorMessage = 'Failed to update the tv show.';
        console.error('Error updating tv show:', error.message);
      }
    );
  }

  onCancel(): void {
    // Navigate back to the tv show list page
    this.router.navigate(['/tv-shows']);
  }

  updatePreview(): void {
    console.log('Preview updated with URL:', this.newImageUrl);
  }
}
