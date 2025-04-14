import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { RoleService } from '../../services/role.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class UserCreateComponent implements OnInit {
  userForm: FormGroup;
  availableRoles: any[] = [];
  loading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private roleService: RoleService
  ) {
    this.userForm = this.fb.group({
      fullName: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmationPassword: ['', [Validators.required]],
      roles: [[]]
    });
  }

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles(): void {
    this.roleService.getAllRoles().subscribe({
      next: (roles) => {
        this.availableRoles = roles;
      },
      error: (error) => {
        console.error('Error loading roles:', error);
      }
    });
  }

  onRoleChange(event: any, roleName: string): void {
    const currentRoles = this.userForm.get('roles')?.value || [];
    if (event.target.checked) {
      if (!currentRoles.includes(roleName)) {
        this.userForm.patchValue({
          roles: [...currentRoles, roleName]
        });
      }
    } else {
      this.userForm.patchValue({
        roles: currentRoles.filter((r: string) => r !== roleName)
      });
    }
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      if (this.userForm.value.password !== this.userForm.value.confirmationPassword) {
        alert('Passwords do not match');
        return;
      }

      this.loading = true;
      const userData = {
        ...this.userForm.value
      };

      this.userService.createUser(userData).subscribe({
        next: () => {
          this.router.navigate(['/users']);
        },
        error: (error) => {
          console.error('Error creating user:', error);
          this.loading = false;
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/users']);
  }
} 