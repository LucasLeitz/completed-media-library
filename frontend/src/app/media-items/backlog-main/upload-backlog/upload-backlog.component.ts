import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {BacklogService} from '../../../services/backlog.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
  selector: 'app-upload-backlog',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './upload-backlog.component.html',
  styleUrl: '../../../css/upload-media.component.css',
})
export class UploadBacklogComponent {
  includeImage: boolean = false;
  foundImageUrl: boolean = true;

  item = {
    title: '',
    imageUrl: '',
    type: ''
  };

  constructor(private backlogService: BacklogService, private router: Router) {}

  searchForImage() {
    if (!this.item.title) {
      alert('Please enter the backlog item title first!');
      return;
    }
    const formattedTitle = this.item.title.replace(/ /g, '_');

    this.backlogService.searchWikipediaImage(formattedTitle).subscribe(
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

    const backlogToSave = {
      ...this.item,
    };

    this.backlogService.addBacklog(backlogToSave).pipe(
      catchError((error) => {
        console.error('Error adding backlog item:', error);
        return of(null);
      })
    ).subscribe({
      next: (response: any) => {
        if (response) {
          console.log('Backlog item added successfully:', response);
          this.router.navigate(['/' + this.item.type + 's/backlog']);
        }
      },
      error: (error: any) => console.error('Error:', error),
      complete: () => console.log('Request complete'),
    });
  }

  onCancel() {
    this.router.navigate(['/' + this.item.type + 's/backlog']);
  }

}
