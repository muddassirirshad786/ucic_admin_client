import { Component } from '@angular/core';
import { JobsService } from '../services/jobs.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-Jobs-create',
  standalone: false,
  templateUrl: './jobs-create.component.html',
  styleUrl: './jobs-create.component.scss'
})
export class JobsCreateComponent {

  jobs = { title: '', description:'', location:'',department:'', salary:''};


  JobsForm!: FormGroup;
  submitted = false;

  constructor(private JobsService: JobsService, private router: Router, private fb: FormBuilder) {
    
  }

  ngOnInit(): void {
    this.JobsForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  get f() {
    return this.JobsForm.controls;
  }


  submitJobs() {
    const formData = new FormData();
    formData.append('title', this.jobs.title);
    formData.append('description', this.jobs.description);
    formData.append('location', this.jobs.location);
    formData.append('department', this.jobs.department);
    formData.append('salary', this.jobs.salary);
    this.JobsService.addJobs(formData).subscribe(() => {
      this.router.navigate(['/Jobs']);
    });
  }

}
