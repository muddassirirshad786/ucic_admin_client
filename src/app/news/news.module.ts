import { createComponent, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { FormsModule } from '@angular/forms';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsCreateComponent } from './news-create/news-create.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    NewsListComponent,
    NewsCreateComponent],
  imports: [
    CommonModule,
    FormsModule,
    NewsRoutingModule,
    HttpClientModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NewsModule { }
