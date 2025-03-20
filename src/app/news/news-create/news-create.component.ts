import { Component } from '@angular/core';
import { NewsService } from '../services/news.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-news-create',
  standalone: false,
  templateUrl: './news-create.component.html',
  styleUrl: './news-create.component.scss'
})
export class NewsCreateComponent {

  news = { title: '', content: '', image: null };


  newsForm!: FormGroup;
  submitted = false;

  constructor(private newsService: NewsService, private router: Router, private fb: FormBuilder) {
    
  }

  ngOnInit(): void {
    this.newsForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      content: ['', [Validators.required, Validators.minLength(20)]],
      //image: ['', Validators.required]
    });
  }

  get f() {
    return this.newsForm.controls;
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.news.image = file;
    }
  }

  submitNews() {
    const formData = new FormData();
    formData.append('title', this.news.title);
    formData.append('content', this.news.content);
    formData.append('file', this.news.image ?? new Blob());
    this.newsService.addNews(formData).subscribe(() => {
      this.router.navigate(['/news']);
    });
  }

}
