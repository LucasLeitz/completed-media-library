import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MediaService } from '../../../services/media.service';
import { Media, MediaType, MediaStatus } from '../../../models/media.model';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MediaLabelPipe } from '../../../pipes/media-label.pipe';

@Component({
  selector: 'app-edit-media',
  templateUrl: './edit-media.component.html',
  styleUrls: ['../../../css/edit-media.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, MediaLabelPipe],
})
export class EditMediaComponent implements OnInit {
  item: Media = {
    id: 0,
    title: '',
    imageUrl: '',
    completedDate: '',
    mediaType: MediaType.BOOK,
    status: MediaStatus.COMPLETED,
  };

  newImageUrl = '';
  isLoading = true;
  errorMessage: string | null = null;

  private readonly mediaRouteMap: Record<MediaType, string> = {
    [MediaType.BOOK]: 'books',
    [MediaType.MOVIE]: 'movies',
    [MediaType.TV_SHOW]: 'tv-shows',
    [MediaType.VIDEO_GAME]: 'video-games',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mediaService: MediaService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.errorMessage = 'No media ID provided.';
      this.isLoading = false;
      return;
    }

    this.mediaService.getById(+id).subscribe({
      next: (data) => {
        this.item = data;
        this.isLoading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = 'Failed to load media item.';
        console.error('Load error:', err.message);
        this.isLoading = false;
      }
    });
  }

  onSave(): void {
    if (this.newImageUrl) {
      this.item.imageUrl = this.newImageUrl;
    }

    // If status is BACKLOG, clear completedDate
    if (this.item.status === MediaStatus.BACKLOG) {
      this.item.completedDate = '';
    }

    this.mediaService.update(this.item.id!, this.item).subscribe({
      next: (updated) => {
        const redirectPath = this.mediaRouteMap[this.item.mediaType];
        this.router.navigate([`/${redirectPath}`]);
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = 'Failed to update media item.';
        console.error('Update error:', err.message);
      }
    });
  }

  onCancel(): void {
    const redirectPath = this.mediaRouteMap[this.item.mediaType];
    this.router.navigate([`/${redirectPath}`]);
  }

  updatePreview(): void {
    console.log('Preview updated with URL:', this.newImageUrl);
  }
}


