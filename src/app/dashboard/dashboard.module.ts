import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DashboardComponent } from './main/dashboard.component';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardRoutingModule } from './dashboard-routing.module';

console.log('Dashboard Module Loaded');
@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    NgxChartsModule, 
    MatCardModule, 
    FlexLayoutModule, 
    DashboardRoutingModule
  ],
})
export class DashboardModule {}
