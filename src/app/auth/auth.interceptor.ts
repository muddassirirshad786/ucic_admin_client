import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Skip adding auth headers for login request
    if (request.url.includes('/Auth/Login')) {
      console.log('Skipping auth header for login request');
      return next.handle(request);
    }

    const token = this.authService.getToken();
    console.log('Intercepting request to:', request.url);
    console.log('Current token:', token);
    
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token.trim()}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      });

      const authReq = request.clone({
        headers,
        withCredentials: false
      });
      
      console.log('Request headers:', authReq.headers.keys().map(key => `${key}: ${authReq.headers.get(key)}`));
      
      return next.handle(authReq).pipe(
        tap(
          event => console.log('Response event:', event),
          error => console.error('Error in interceptor:', error)
        ),
        catchError((error: HttpErrorResponse) => {
          console.error('HTTP Error:', {
            status: error.status,
            statusText: error.statusText,
            url: error.url,
            headers: error.headers,
            error: error.error
          });
          
          if (error.status === 401 || error.status === 0) {
            console.error('Unauthorized request or network error. Token:', token);
            this.authService.clearAuthData();
            this.router.navigate(['/login']);
          }
          return throwError(() => error);
        })
      );
    }
    
    return next.handle(request);
  }
} 
