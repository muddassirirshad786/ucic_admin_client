import { Component, OnInit } from '@angular/core';
import { VendorsService } from '../services/vendors.service';

@Component({
  selector: 'app-vendors-list',
  standalone: false,
  templateUrl: './vendors-list.component.html',
  styleUrl: './vendors-list.component.scss'
})
export class VendorsListComponent implements OnInit {
  vendorsList: any[] = [];

  constructor(private vendorsService: VendorsService) {}

  ngOnInit(): void {
    this.getAllVendors();
  }

  getAllVendors(): void {
    this.vendorsService.getVendors().subscribe({
      next: (res) => {
        this.vendorsList = res;
      },
      error: (err) => {
        console.error('Error fetching jobs:', err);
      }
    });
  }

  approveVendors(vendorId: number): void {
    if (confirm('Are you sure you want to approve this vendor?')) {
      this.vendorsService.approveVendors(vendorId).subscribe({
        next: () => {
          this.getAllVendors();
        },
        error: (err) => {
          console.error('Error deleting job:', err);
        }
      });
    }
  }
}
