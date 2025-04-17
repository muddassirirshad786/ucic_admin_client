import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from '../auth-routing.module';
import { RoleService, UserRole } from '../../services/role.service';

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

  constructor(
    private authService: AuthService,
    private router: Router,
    private roleService: RoleService
  ) {}

  login() {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.authService.login(this.email, this.password).subscribe({
      next: (response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          const userRole = this.getUserRole(this.email);
          localStorage.setItem('userRole', userRole);
          this.roleService.setRole(userRole);
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

  private getUserRole(email: string): UserRole {
    const roleMap: { [key: string]: UserRole } = {
      'admin': UserRole.ADMIN,
      'hr': UserRole.HR,
      'finance': UserRole.FINANCE,
      'purchase': UserRole.PURCHASE,
      'sale': UserRole.SALE
    };

    return roleMap[email.toLowerCase().split('@')[0]] || UserRole.ADMIN;
  }
}
