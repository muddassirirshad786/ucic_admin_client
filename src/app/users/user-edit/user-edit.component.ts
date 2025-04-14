import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { RoleService } from '../../services/role.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class UserEditComponent implements OnInit {
  userForm: FormGroup;
  userId: string = '';
  availableRoles: any[] = [];
  loading = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private roleService: RoleService
  ) {
    this.userForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      roles: [[]]
    });
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id')!;
    this.loadUser();
    this.loadRoles();
  }

  loadUser(): void {
    this.loading = true;
    this.userService.getUserDetails(this.userId).subscribe({
      next: (user) => {
        this.userForm.patchValue({
          fullName: user.fullName,
          email: user.email,
          roles: user.roles || []
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading user:', error);
        this.loading = false;
      }
    });
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
      this.loading = true;
      const userData = {
        id: this.userId,
        ...this.userForm.value
      };

      this.userService.updateUserProfile(this.userId, userData).subscribe({
        next: () => {
          this.router.navigate(['/users']);
        },
        error: (error) => {
          console.error('Error updating user:', error);
          this.loading = false;
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/users']);
  }
} 