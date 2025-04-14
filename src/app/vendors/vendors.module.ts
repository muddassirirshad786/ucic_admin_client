import { createComponent, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorsRoutingModule } from './vendors-routing.module';
import { FormsModule } from '@angular/forms';
import { VendorsListComponent } from './vendors-list/vendors-list.component';


@NgModule({
  declarations: [
    VendorsListComponent],
  imports: [
    CommonModule,
    FormsModule,
    VendorsRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VendorsModule { }
