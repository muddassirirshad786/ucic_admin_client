import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private apiUrl = 'https://unitedcement.org/service/api';
  
  constructor(private http: HttpClient) {}

  getNews(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/News/GetAll`);
  }

  addNews(news: FormData): Observable<any> {
    debugger
    return this.http.post(`https://localhost:7219/api/News/Create`, news);
  }

  
  deleteNews(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
