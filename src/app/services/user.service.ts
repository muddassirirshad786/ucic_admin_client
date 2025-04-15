import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private apiUrl = `${environment.apiUrl}/User`;

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetAll`);
  }

  getUserDetails(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetUserDetails/${userId}`);
  }

  createUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Create`, userData);
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Delete/${userId}`);
  }

  updateUserProfile(id: string, userData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/EditUserProfile/${id}`, userData);
  }

  assignRoles(userName: string, roles: string[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/AssignRoles`, { userName, roles });
  }

  updateUserRoles(userName: string, roles: string[]): Observable<any> {
    return this.http.put(`${this.apiUrl}/EditUserRoles`, { userName, roles });
  }
} 