import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VideoGameService } from '../../../services/video-game.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http'; // Import for error handling

@Component({
  selector: 'app-edit-video-game',
  templateUrl: './edit-video-game.component.html',
  styleUrls: ['../../../css/edit-media.component.css'],
  imports: [FormsModule, CommonModule],
  standalone: true,
})
export class EditVideoGameComponent implements OnInit {
  game: any = {
    id: null,
    title: '',
    platform: '',
    completedDate: '',
    imageUrl: '',
  };
  newImageUrl: string = ''; // Holds the new image URL entered by the user
  isLoading: boolean = true; // Flag to show a loading state
  errorMessage: string | null = null; // Holds error messages, if any

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private videoGameService: VideoGameService
  ) {}

  ngOnInit(): void {
    // Get the ID from the route parameters
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.errorMessage = 'No ID provided for the video game.';
      this.isLoading = false;
      return;
    }

    // Fetch the video game by ID
    this.videoGameService.getVideoGameById(id).subscribe(
      (data) => {
        this.game = data;
        this.isLoading = false;
      },
      (error: HttpErrorResponse) => { // Explicit type for error
        this.errorMessage = 'Failed to load the video game.';
        this.isLoading = false;
        console.error('Error loading video game:', error.message);
      }
    );
  }

  onSave(): void {
    // Update the image URL if a new one is provided
    if (this.newImageUrl) {
      this.game.imageUrl = this.newImageUrl;
    }

    // Make the REST call to update the video game
    this.videoGameService.updateVideoGame(this.game.id, this.game).subscribe(
      (updatedGame) => {
        console.log('Video game updated:', updatedGame);
        this.router.navigate(['/video-games']); // Navigate back to the list page
      },
      (error: HttpErrorResponse) => { // Explicit type for error
        this.errorMessage = 'Failed to update the video game.';
        console.error('Error updating video game:', error.message);
      }
    );
  }

  onCancel(): void {
    // Navigate back to the video game list page
    this.router.navigate(['/video-games']);
  }

  updatePreview(): void {
    console.log('Preview updated with URL:', this.newImageUrl);
  }
}



