import { Component } from '@angular/core';
import {Backlog} from '../../../models/backlog.model';
import {BacklogService} from '../../../services/backlog.service';
import {Router} from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-movie-backlog',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './movie-backlog.component.html',
  styleUrl: '../../../css/media.component.css'
})
export class MovieBacklogComponent {
  backlogs: Backlog[] = [];
  filteredBacklogs: Backlog[] = [];
  flippedCards: boolean[] = []; // Tracks the flip state of each card
  searchTerm: string = '';
  showSearch: boolean = false;
  showSortOptions: boolean = false;
  sortCriteria: string = 'title';

  constructor(
    private backlogService: BacklogService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.backlogService.getBacklogsByType("movie").subscribe((data) => {
      this.backlogs = data;
      this.filteredBacklogs = data;
      this.flippedCards = this.backlogs.map(() => false); // Initialize flip states
    });
  }

  // Method to toggle flip state for a card
  flipCard(index: number): void {
    this.flippedCards[index] = !this.flippedCards[index];
  }

  goToCompletedMovies() {
    this.router.navigate(['/movies']);
  }

  // Navigate to the "Add Backlog Item" page
  addBacklogItem(): void {
    this.router.navigate(['/add-backlog']);
  }

  // Method to remove a backlog item
  removeBacklogItem(index: number): void {
    const backlogItemToRemove = this.filteredBacklogs[index];
    if (!backlogItemToRemove || !backlogItemToRemove.id) {
      console.error("Invalid movie or missing ID:", backlogItemToRemove);
      return;
    }

    console.log("Deleting movie with ID:", backlogItemToRemove.id); // Debug the ID

    if (confirm('Are you sure you want to remove this movie?')) {
      this.flipCard(index);
      this.backlogService.deleteBacklog(backlogItemToRemove.id).subscribe({
        next: () => {
          this.backlogs = this.backlogs.filter(backlog => backlog.id !== backlogItemToRemove.id);
          this.filteredBacklogs = this.filteredBacklogs.filter(backlog => backlog.id !== backlogItemToRemove.id);
          console.log(`Movie with ID ${backlogItemToRemove.id} successfully deleted.`);
        },
        error: (err) => {
          console.error('Failed to delete the movie:', err);
          alert('Could not delete the movie. Please try again.');
        },
      });
    }
  }

}
