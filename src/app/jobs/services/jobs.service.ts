import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  private apiUrl = 'https://unitedcement.org/service/api';
  
  constructor(private http: HttpClient) {}

  getJobs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Jobs/GetAll`);
  }

  addJobs(Jobs: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/Jobs/Create`, Jobs);
  }

  
  deleteJobs(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Jobs/Delete/${id}`);
  }
}
