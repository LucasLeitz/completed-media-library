import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TvShowService } from '../../../services/tv-show.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-upload-tv-show',
  templateUrl: './upload-tv-show.component.html',
  styleUrl: '../../../css/upload-media.component.css',
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class UploadTvShowComponent {
  includeImage: boolean = false;
  foundImageUrl: boolean = true;

  item = {
    title: '',
    imageUrl: '',
    completedDate: ''
  };

  constructor(private tvShowService: TvShowService, private router: Router) {}

  searchForImage() {
    if (!this.item.title) {
      alert('Please enter the TV show title first!');
      return;
    }
    const formattedTitle = this.item.title.replace(/ /g, '_');

    this.tvShowService.searchWikipediaImage(formattedTitle).subscribe(
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

    const tvShowToSave = {
      ...this.item,
      completedDate: formattedDate,
    };

    this.tvShowService.addTvShow(tvShowToSave).pipe(
      catchError((error) => {
        console.error('Error adding TV show:', error);
        return of(null);
      })
    ).subscribe({
      next: (response: any) => {
        if (response) {
          console.log('TV show added successfully:', response);
          this.router.navigate(['/tv-shows']);
        }
      },
      error: (error: any) => console.error('Error:', error),
      complete: () => console.log('Request complete'),
    });
  }

  onCancel() {
    this.router.navigate(['/tv-shows']);
  }
}
