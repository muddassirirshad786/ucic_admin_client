import { createComponent, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobsRoutingModule } from './jobs-routing.module';
import { FormsModule } from '@angular/forms';
import { JobsCreateComponent } from './jobs-create/jobs-create.component';
import { HttpClientModule } from '@angular/common/http';
import { JobsListComponent } from './jobs-list/jobs-list.component';


@NgModule({
  declarations: [
    JobsListComponent,
    JobsCreateComponent],
  imports: [
    CommonModule,
    FormsModule,
    JobsRoutingModule,
    HttpClientModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JobsModule { }
