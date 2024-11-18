import { Component } from '@angular/core';
import { BookService } from '../../../services/book.service';
import { Book } from '../../../models/book.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book.component.html',
  styleUrl: '../../../css/media.component.css'
})
export class BookComponent {
  books: Book[] = [];
  filteredBooks: Book[] = [];
  flippedCards: boolean[] = [];
  searchTerm: string = '';
  showSearch: boolean = false;
  showSortOptions: boolean = false;
  sortCriteria: string = 'title';

  constructor(
    private bookService: BookService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe((data) => {
      this.books = data;
      this.filteredBooks = data;
      this.flippedCards = this.books.map(() => false);
    });
  }

  toggleSortOptions(): void {
    this.showSortOptions = !this.showSortOptions;
  }

  sortBooks(): void {
    const sorted = [...this.filteredBooks];
    switch (this.sortCriteria) {
      case 'title':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'completedDate':
        sorted.sort((a, b) => (a.completedDate || '').localeCompare(b.completedDate || ''));
        break;
    }
    this.filteredBooks = sorted;
  }

  toggleSearch(): void {
    this.showSearch = !this.showSearch;
    if (!this.showSearch) {
      this.resetFilter();
    }
  }

  filterBooks(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredBooks = this.books;
    } else {
      this.filteredBooks = this.books.filter(book =>
        book.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  resetFilter(): void {
    this.searchTerm = '';
    this.filteredBooks = this.books;
  }

  flipCard(index: number): void {
    this.flippedCards[index] = !this.flippedCards[index];
  }

  removeBook(index: number): void {
    const bookToRemove = this.filteredBooks[index];
    if (!bookToRemove || !bookToRemove.id) {
      console.error("Invalid book or missing ID:", bookToRemove);
      return;
    }

    if (confirm('Are you sure you want to remove this book?')) {
      this.bookService.deleteBook(bookToRemove.id).subscribe({
        next: () => {
          this.books = this.books.filter(book => book.id !== bookToRemove.id);
          this.filteredBooks = this.filteredBooks.filter(book => book.id !== bookToRemove.id);
        },
        error: (err) => {
          console.error('Failed to delete the book:', err);
          alert('Could not delete the book. Please try again.');
        },
      });
    }
  }

  addBook(): void {
    this.router.navigate(['/add-book']);
  }

  // Navigate to the "Edit Book" page
  editBook(index: number): void {
    if (index < 0 || index >= this.filteredBooks.length) {
      console.error(`Index out of range: ${index}`);
      return;
    }

    const bookToEdit = this.filteredBooks[index];
    if (!bookToEdit?.id) {
      console.error(`Invalid book or missing ID for book at index ${index}:`, bookToEdit);
      return;
    }

    this.router.navigate(['/edit-book', bookToEdit.id]);
  }

}
