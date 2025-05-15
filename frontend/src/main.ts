 import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router'; // Import provideRouter
import { routes } from './app/app.routes'; // Import your routes

import { ApplicationConfig } from '@angular/core';

const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()), // Configures HttpClient to use fetch API
    provideRouter(routes), // Adds routing configuration
  ]
};

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));
