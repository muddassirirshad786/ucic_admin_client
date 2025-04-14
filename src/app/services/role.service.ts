import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiUrl = `${environment.apiUrl}/Role`;

  constructor(private http: HttpClient) { }

  getAllRoles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetAll`);
  }

  getRoleById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createRole(roleName: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/Create`, { roleName });
  }

  updateRole(id: string, roleName: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/Edit/${id}`, { id, roleName });
  }

  deleteRole(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Delete/${id}`);
  }
} 