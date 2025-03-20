import { Component } from '@angular/core';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-news-list',
  standalone: false,
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.scss'
})
export class NewsListComponent {

  newsList: any[] = [];

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.getAllNews();
  }

  getAllNews(): void {
    this.newsService.getNews().subscribe((news) => {
      this.newsList = news;
    });
  }

  deleteNews(id: number): void {
    if (confirm('Are you sure you want to delete this news?')) {
      this.newsService.deleteNews(id).subscribe(() => {
        this.getAllNews();
      });
    }
  }

}
