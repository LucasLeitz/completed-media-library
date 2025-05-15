import { Component, OnInit } from '@angular/core';
import { MediaService } from '../../../services/media.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Media, MediaType, MediaStatus } from '../../../models/media.model';
import { catchError, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MediaLabelPipe } from '../../../pipes/media-label.pipe';

@Component({
  selector: 'app-upload-media',
  templateUrl: './upload-media.component.html',
  styleUrl: '../../../css/upload-media.component.css',
  standalone: true,
  imports: [FormsModule, CommonModule, MediaLabelPipe],
})
export class UploadMediaComponent implements OnInit {
  private readonly mediaRouteMap: Record<MediaType, string> = {
    [MediaType.BOOK]: 'books',
    [MediaType.MOVIE]: 'movies',
    [MediaType.TV_SHOW]: 'tv-shows',
    [MediaType.VIDEO_GAME]: 'video-games'
  };

  mediaType!: MediaType;
  status: MediaStatus = MediaStatus.COMPLETED;
  includeImage = false;
  foundImageUrl = true;

  item: Partial<Media> = {
    title: '',
    imageUrl: '',
    completedDate: ''
  };

  constructor(
    private mediaService: MediaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const typeFromRoute = this.route.snapshot.data['mediaType'];
    const statusFromRoute = this.route.snapshot.data['status'];

    if (!typeFromRoute || !(typeFromRoute in MediaType)) {
      throw new Error('Invalid or missing media type');
    }
    const typeKey = typeFromRoute as keyof typeof MediaType;
    this.mediaType = MediaType[typeKey];

    if (statusFromRoute && statusFromRoute in MediaStatus) {
      const statusKey = statusFromRoute as keyof typeof MediaStatus;
      this.item.status = MediaStatus[statusKey];
    } else {
      this.item.status = MediaStatus.COMPLETED; // fallback just in case
    }

    this.item.mediaType = this.mediaType;
  }


  searchForImage(): void {
    if (!this.item.title) {
      alert('Please enter the title first!');
      return;
    }

    const formattedTitle = this.item.title.replace(/ /g, '_');
    this.mediaService.searchWikipediaImage(formattedTitle).subscribe({
      next: (response: { imageUrl: string | null }) => {
        this.item.imageUrl = response.imageUrl ?? '';
        this.foundImageUrl = !!response.imageUrl;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error searching Wikipedia:', error);
        this.item.imageUrl = '';
        this.foundImageUrl = false;
      }
    });
  }

  onSubmit(): void {
    const formattedDate =
      this.item.status === MediaStatus.COMPLETED && this.item.completedDate
        ? new Date(this.item.completedDate).toISOString().split('T')[0]
        : '';

    const newItem: Media = {
      ...(this.item as Media),
      completedDate: formattedDate,
      mediaType: this.mediaType,
      status: this.item.status ?? MediaStatus.COMPLETED,
      id: 0
    };

    this.mediaService.add(newItem).pipe(
      catchError((error) => {
        console.error('Error adding item:', error);
        return of(null);
      })
    ).subscribe((response: any) => {
      if (response) {
        console.log('Media item added:', response);

        const routeSegment = this.mediaRouteMap[this.mediaType];
        const redirectPath = this.item.status === MediaStatus.BACKLOG
          ? `/${routeSegment}/backlog`
          : `/${routeSegment}`;

        this.router.navigate([redirectPath]);
      }
    });
  }

  onCancel(): void {
    const targetRoute = `/${this.mediaRouteMap[this.mediaType]}${this.status === MediaStatus.BACKLOG ? '/backlog' : ''}`;
    this.router.navigate([targetRoute]);
  }
}


