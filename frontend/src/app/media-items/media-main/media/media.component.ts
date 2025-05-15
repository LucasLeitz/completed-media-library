import { Component, OnInit } from '@angular/core';
import { MediaService } from '../../../services/media.service';
import { Media, MediaType } from '../../../models/media.model';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MediaLabelPipe } from '../../../pipes/media-label.pipe'
import { MediaStatus } from '../../../models/media.model';

@Component({
  selector: 'app-media',
  standalone: true,
  imports: [CommonModule, FormsModule, MediaLabelPipe],
  templateUrl: './media.component.html',
  styleUrls: ['../../../css/media.component.css']
})
export class MediaComponent implements OnInit {

  private readonly mediaRouteMap: Record<MediaType, string> = {
    [MediaType.BOOK]: 'book',
    [MediaType.MOVIE]: 'movie',
    [MediaType.TV_SHOW]: 'tv-show',
    [MediaType.VIDEO_GAME]: 'video-game',
  };

  mediaType!: MediaType;
  addRoute!: string;
  editRoutePrefix!: string;
  backlogRoute!: string;

  mediaList: Media[] = [];
  filteredList: Media[] = [];
  flippedCards: boolean[] = [];
  searchTerm: string = '';
  showSearch = false;
  showSortOptions = false;
  sortCriteria: string = 'title';

  constructor(
    private mediaService: MediaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const typeFromRoute = this.route.snapshot.data['mediaType'];

    if (!typeFromRoute || !(typeFromRoute in MediaType)) {
      console.error('Invalid or missing mediaType!');
      return;
    }

    const key = typeFromRoute as keyof typeof MediaType;
    this.mediaType = MediaType[key];

    const routeSegment = this.mediaRouteMap[this.mediaType];
    this.addRoute = `/add-${routeSegment}`;
    this.editRoutePrefix = `/edit-${routeSegment}`;
    this.backlogRoute = `/${routeSegment}s/backlog`;

    this.mediaService.getByTypeAndStatus(this.mediaType, MediaStatus.COMPLETED).subscribe((data) => {
      this.mediaList = data;
      this.filteredList = data;
      this.flippedCards = this.mediaList.map(() => false);
    });
  }

  toggleSortOptions(): void {
    this.showSortOptions = !this.showSortOptions;
  }

  sortItems(): void {
    const sorted = [...this.filteredList];
    switch (this.sortCriteria) {
      case 'title':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'completedDate':
        sorted.sort((a, b) => (a.completedDate || '').localeCompare(b.completedDate || ''));
        break;
    }
    this.filteredList = sorted;
  }

  toggleSearch(): void {
    this.showSearch = !this.showSearch;
    if (!this.showSearch) {
      this.resetFilter();
    }
  }

  filterItems(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredList = this.mediaList;
    } else {
      this.filteredList = this.mediaList.filter(item =>
        item.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  resetFilter(): void {
    this.searchTerm = '';
    this.filteredList = this.mediaList;
  }

  flipCard(index: number): void {
    this.flippedCards[index] = !this.flippedCards[index];
  }

  removeItem(index: number): void {
    const itemToRemove = this.filteredList[index];
    if (!itemToRemove?.id) return;

    if (confirm('Are you sure you want to remove this item?')) {
      this.flipCard(index);
      this.mediaService.delete(itemToRemove.id).subscribe({
        next: () => {
          this.mediaList = this.mediaList.filter(item => item.id !== itemToRemove.id);
          this.filteredList = this.filteredList.filter(item => item.id !== itemToRemove.id);
        },
        error: (err: any) => {
          console.error('Delete failed:', err);
          alert('Could not delete the item.');
        }
      });
    }
  }

  addItem(): void {
    this.router.navigate([this.addRoute], { state: { status: 'COMPLETED' } });

  }

  editItem(index: number): void {
    const itemToEdit = this.filteredList[index];
    if (!itemToEdit?.id) return;
    this.router.navigate(['/edit-media', itemToEdit.id]);
  }


  goToBacklog(): void {
    this.router.navigate([this.backlogRoute]);
  }
}


