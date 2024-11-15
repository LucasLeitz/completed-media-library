import { Component } from '@angular/core';
import { VideoGameService } from '../services/video-game.service';
import { VideoGame} from '../models/video-game.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-video-game-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './video-game-list.component.html',
  styleUrl: './video-game-list.component.css'
})
export class VideoGameListComponent {
  videoGames: VideoGame[] = [];
  filteredGames: VideoGame[] = [];
  flippedCards: boolean[] = []; // Tracks the flip state of each card
  searchTerm: string = '';
  showSearch: boolean = false;
  showSortOptions: boolean = false;
  sortCriteria: string = 'title';

  constructor(
    private videoGameService: VideoGameService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.videoGameService.getAllVideoGames().subscribe((data) => {
      this.videoGames = data;
      this.filteredGames = data;
      this.flippedCards = this.videoGames.map(() => false); // Initialize flip states
    });
  }

  // Toggle sort options visibility
  toggleSortOptions(): void {
    this.showSortOptions = !this.showSortOptions;
  }

  // Sort games based on the selected criteria
  sortGames(): void {
    const sorted = [...this.filteredGames]; // Create a copy to avoid mutating the original array

    switch (this.sortCriteria) {
      case 'title':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'completedDate':
        sorted.sort((a, b) => (a.completedDate || '').localeCompare(b.completedDate || ''));
        break;
      case 'platform':
        sorted.sort((a, b) => a.platform.localeCompare(b.platform));
        break;
    }

    this.filteredGames = sorted; // Update the displayed games with the sorted list
  }

  // Toggle search input visibility
  toggleSearch(): void {
    this.showSearch = !this.showSearch;
    if (!this.showSearch) {
      this.resetFilter(); // Reset search when closing
    }
  }

  // Filter games based on search term
  filterGames(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredGames = this.videoGames; // Show all games if search is empty
    } else {
      this.filteredGames = this.videoGames.filter(game =>
        game.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  // Reset search filter
  resetFilter(): void {
    this.searchTerm = '';
    this.filteredGames = this.videoGames;
  }

  // Method to toggle flip state for a card
  flipCard(index: number): void {
    this.flippedCards[index] = !this.flippedCards[index];
  }

  // Method to remove a game
  removeGame(index: number): void {
    const gameToRemove = this.videoGames[index];
    if (confirm('Are you sure you want to remove this game?')) {
      this.videoGameService.deleteVideoGame(gameToRemove.id).subscribe(() => {
        this.videoGames.splice(index, 1); // Update UI after successful deletion
        this.flippedCards.splice(index, 1); // Remove the corresponding flip state
      }, error => {
        console.error('Failed to delete the game:', error);
        alert('Could not delete the game. Please try again.');
      });
    }
  }

  // Navigate to the "Add Video Game" page
  goToAddVideoGame(): void {
    this.router.navigate(['/add-video-game']);
  }
}
