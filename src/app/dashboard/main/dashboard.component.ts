import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone:false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  
  chartData = [
    { name: 'Sales', value: 5000 },
    { name: 'Revenue', value: 3000 },
    { name: 'Users', value: 2000 },
  ];

  ngOnInit(): void {

    console.log('DashboardComponent initialized');
    debugger
  }


}
