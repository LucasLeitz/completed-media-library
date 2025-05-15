import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Media, MediaStatus, MediaType } from '../../../models/media.model';
import { MediaService } from '../../../services/media.service';
import { CommonModule } from '@angular/common';
import { MediaLabelPipe } from '../../../pipes/media-label.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-media-backlog',
  standalone: true,
  imports: [CommonModule, MediaLabelPipe, FormsModule],
  templateUrl: './media-backlog.component.html',
  styleUrl: '../../../css/media.component.css'
})
export class MediaBacklogComponent implements OnInit {
  mediaType!: MediaType;
  backlogs: Media[] = [];
  filteredBacklogs: Media[] = [];
  flippedCards: boolean[] = [];
  searchTerm = '';
  showSearch = false;
  showSortOptions = false;
  sortCriteria = 'title';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mediaService: MediaService
  ) {}

  ngOnInit(): void {
    const typeFromRoute = this.route.snapshot.data['mediaType'];
    if (!typeFromRoute || !(typeFromRoute in MediaType)) {
      console.error('Invalid or missing mediaType!');
      return;
    }

    const key = typeFromRoute as keyof typeof MediaType;
    this.mediaType = MediaType[key];

    this.mediaService.getByTypeAndStatus(this.mediaType, MediaStatus.BACKLOG).subscribe((data) => {
      this.backlogs = data;
      this.filteredBacklogs = data;
      this.flippedCards = data.map(() => false);
    });
  }

  flipCard(index: number): void {
    this.flippedCards[index] = !this.flippedCards[index];
  }

  goToCompletedMedia(): void {
    const routeSegment = this.getRouteSegment();
    this.router.navigate([`/${routeSegment}`]);
  }

  addBacklogItem(): void {
    const routeSegment = this.mediaType.toLowerCase().replace('_', '-');
    this.router.navigate([`/add-${routeSegment}/backlog`]);
  }

  removeBacklogItem(index: number): void {
    const item = this.filteredBacklogs[index];
    if (!item?.id) return;

    if (confirm(`Remove this ${this.mediaType.toLowerCase()}?`)) {
      this.flipCard(index);
      this.mediaService.delete(item.id).subscribe({
        next: () => {
          this.backlogs = this.backlogs.filter(b => b.id !== item.id);
          this.filteredBacklogs = this.filteredBacklogs.filter(b => b.id !== item.id);
        },
        error: (err) => {
          console.error('Failed to delete:', err);
          alert(`Could not delete the ${this.mediaType.toLowerCase()}.`);
        }
      });
    }
  }

  toggleSortOptions(): void {
    this.showSortOptions = !this.showSortOptions;
  }

  sortItems(): void {
    const sorted = [...this.filteredBacklogs];
    switch (this.sortCriteria) {
      case 'title':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'completedDate':
        sorted.sort((a, b) => (a.completedDate || '').localeCompare(b.completedDate || ''));
        break;
    }
    this.filteredBacklogs = sorted;
  }

  toggleSearch(): void {
    this.showSearch = !this.showSearch;
    if (!this.showSearch) {
      this.resetFilter();
    }
  }

  filterItems(): void {
    if (!this.searchTerm.trim()) {
      this.filteredBacklogs = this.backlogs;
    } else {
      this.filteredBacklogs = this.backlogs.filter(item =>
        item.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  resetFilter(): void {
    this.searchTerm = '';
    this.filteredBacklogs = this.backlogs;
  }

  private getRouteSegment(): string {
    return this.mediaType.toLowerCase().replace('_', '-') + 's';
  }

  editBacklogItem(index: number): void {
    const item = this.filteredBacklogs[index];
    if (!item?.id) return;
    this.router.navigate(['/edit-media', item.id]);
  }

}


