import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private currentUser = new BehaviorSubject<any>(null);

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.checkAuthStatus();
  }

  getToken(): string | null {
    const token = localStorage.getItem('token');
    console.log('Current token:', token);
    return token;
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.status === 0) {
      errorMessage = 'Network error: Please check your internet connection and try again.';
    } else if (error.status === 401) {
      errorMessage = 'Unauthorized: Please check your credentials.';
    } else if (error.status === 403) {
      errorMessage = 'Forbidden: You do not have permission to access this resource.';
    } else {
      errorMessage = `Server error: ${error.status} - ${error.error?.message || error.message}`;
    }
    console.error('Auth Service Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/Auth/Login`, { email, password }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      withCredentials: false
    }).pipe(
      tap((response: any) => {
        console.log('Login Response:', response);
        if (response && response.token) {
          console.log('Token received from API:', response.token);
          console.log('Authorization header will be:', `Bearer ${response.token}`);
          
          // Decode and log token claims
          try {
            const tokenPayload = JSON.parse(atob(response.token.split('.')[1]));
            console.log('Token payload:', tokenPayload);
            console.log('User role:', tokenPayload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);
          } catch (e) {
            console.error('Error decoding token:', e);
          }

          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify({
            userId: response.userId,
            name: response.name,
            role: response.role
          }));
          this.isAuthenticated.next(true);
          this.currentUser.next(response);
        }
      }),
      catchError(this.handleError)
    );
  }

  logout(): void {
    this.http.post(`${environment.apiUrl}/Auth/logout`, {}, {
      withCredentials: false
    }).subscribe({
      next: () => {
        this.clearAuthData();
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Logout error:', error);
        this.clearAuthData();
        this.router.navigate(['/login']);
      }
    });
  }

  clearAuthData(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isAuthenticated.next(false);
    this.currentUser.next(null);
  }

  checkAuthStatus(): void {
    const token = this.getToken();
    const user = localStorage.getItem('user');
    
    if (token && user) {
      try {
        const userData = JSON.parse(user);
        console.log('Current user role:', userData.role);
        this.isAuthenticated.next(true);
        this.currentUser.next(userData);
      } catch (e) {
        console.error('Error parsing user data:', e);
        this.clearAuthData();
        this.router.navigate(['/login']);
      }
    } else {
      this.clearAuthData();
      this.router.navigate(['/login']);
    }
  }

  isLoggedIn(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  getCurrentUser(): Observable<any> {
    return this.currentUser.asObservable();
  }
}
