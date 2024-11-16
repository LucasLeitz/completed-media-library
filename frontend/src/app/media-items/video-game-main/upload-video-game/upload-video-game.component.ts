import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VideoGameService } from '../../../services/video-game.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-upload-video-game',
  templateUrl: './upload-video-game.component.html',
  styleUrl: '../../../css/upload-media.component.css',
  standalone: true,
  imports: [FormsModule, CommonModule],
})

export class UploadVideoGameComponent {
  includeImage: boolean = false;
  foundImageUrl: boolean = true;

  item = {
    title: '',
    platform: '',
    imageUrl: '',
    completedDate: ''
  };

  constructor(private videoGameService: VideoGameService, private router: Router) {}

  // Search Wikipedia for an image using the game title
  searchForImage() {
    if (!this.item.title) {
      alert('Please enter the game name first!');
      return;
    }
    const formattedTitle = this.item.title.replace(/ /g, '_');

    this.videoGameService.searchWikipediaImage(formattedTitle).subscribe(
      (response: { imageUrl: string | null }) => {
        this.item.imageUrl = response.imageUrl || ''; // Use empty string if imageUrl is null
        if(this.item.imageUrl == ''){
          this.foundImageUrl = false;
        }
      },
      (error: HttpErrorResponse) => {
        console.error('Error searching Wikipedia:', error);
        this.item.imageUrl = ''; // Clear image URL if there’s an error
        this.foundImageUrl = false;
      }
    );
  }

  onSubmit() {
    // Format the completedDate to ensure correct submission
    const formattedDate = this.item.completedDate
      ? new Date(this.item.completedDate).toISOString().split('T')[0] // Convert to YYYY-MM-DD
      : null;

    // Prepare the item with the formatted date
    const videoGameToSave = {
      ...this.item,
      completedDate: formattedDate,
    };

    console.log('Submitting Video Game:', videoGameToSave); // Debug log

    this.videoGameService.addVideoGame(videoGameToSave).pipe(
      catchError((error) => {
        console.error('Error adding video game:', error);
        return of(null); // Return a fallback observable
      })
    ).subscribe({
      next: (response: any) => {
        if (response) {
          console.log('Video game added successfully:', response);
          this.router.navigate(['/video-games']); // Navigate back to video-game page
        }
      },
      error: (error: any) => console.error('Error:', error),
      complete: () => console.log('Request complete'),
    });
  }

  onCancel() {
    this.router.navigate(['/video-games']);
  }
}




