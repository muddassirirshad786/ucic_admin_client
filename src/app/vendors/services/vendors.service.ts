import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendorsService {

  private apiUrl = 'https://localhost:44344/api';
  
  constructor(private http: HttpClient) {}

  getVendors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Vendors/GetAll`);
  }
  
  approveVendors(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Vendors/Approve/${id}`);
  }
}
