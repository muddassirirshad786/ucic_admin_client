import { Component, OnInit } from '@angular/core';
import { JobsService } from '../services/jobs.service';

@Component({
  selector: 'app-jobs-list',
  standalone: false,
  templateUrl: './jobs-list.component.html',
  styleUrl: './jobs-list.component.scss'
})
export class JobsListComponent implements OnInit {
  jobsList: any[] = [];

  constructor(private jobsService: JobsService) {}

  ngOnInit(): void {
    this.getAllJobs();
  }

  getAllJobs(): void {
    this.jobsService.getJobs().subscribe({
      next: (res) => {
        this.jobsList = res;
      },
      error: (err) => {
        console.error('Error fetching jobs:', err);
      }
    });
  }

  deleteJob(jobId: number): void {
    if (confirm('Are you sure you want to delete this job?')) {
      this.jobsService.deleteJobs(jobId).subscribe({
        next: () => {
          this.jobsList = this.jobsList.filter(job => job.jobsId !== jobId);
        },
        error: (err) => {
          console.error('Error deleting job:', err);
        }
      });
    }
  }
}
