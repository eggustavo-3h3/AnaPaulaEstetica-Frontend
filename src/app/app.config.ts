import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { RouterModule, provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { authInterceptor } from './interceptors/auth.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    MatSnackBarModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule
  ]
};
