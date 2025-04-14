import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from '../auth-routing.module';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, AuthRoutingModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    debugger;
    this.isLoading = true;
    this.errorMessage = '';
    
    this.authService.login(this.email, this.password).subscribe({
      next: (response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/dashboard']);
        }
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Invalid email or password';
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
