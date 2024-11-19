import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../../services/book.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http'; // Import for error handling

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['../../../css/edit-media.component.css'],
  imports: [FormsModule, CommonModule],
  standalone: true,
})
export class EditBookComponent implements OnInit {
  book: any = {
    id: null,
    title: '',
    completedDate: '',
    imageUrl: '',
  };
  newImageUrl: string = ''; // Holds the new image URL entered by the user
  isLoading: boolean = true; // Flag to show a loading state
  errorMessage: string | null = null; // Holds error messages, if any

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    // Get the ID from the route parameters
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.errorMessage = 'No ID provided for the book.';
      this.isLoading = false;
      return;
    }

    // Fetch the book by ID
    this.bookService.getBookById(id).subscribe(
      (data) => {
        this.book = data;
        this.isLoading = false;
      },
      (error: HttpErrorResponse) => { // Explicit type for error
        this.errorMessage = 'Failed to load the book.';
        this.isLoading = false;
        console.error('Error loading book:', error.message);
      }
    );
  }

  onSave(): void {
    // Update the image URL if a new one is provided
    if (this.newImageUrl) {
      this.book.imageUrl = this.newImageUrl;
    }

    // Make the REST call to update the book
    this.bookService.updateBook(this.book.id, this.book).subscribe(
      (updatedBook) => {
        console.log('Book updated:', updatedBook);
        this.router.navigate(['/books']); // Navigate back to the list page
      },
      (error: HttpErrorResponse) => { // Explicit type for error
        this.errorMessage = 'Failed to update the book.';
        console.error('Error updating book:', error.message);
      }
    );
  }

  onCancel(): void {
    // Navigate back to the book list page
    this.router.navigate(['/books']);
  }

  updatePreview(): void {
    console.log('Preview updated with URL:', this.newImageUrl);
  }
}
