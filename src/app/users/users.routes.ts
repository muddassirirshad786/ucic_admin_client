import { Routes } from '@angular/router';
import { RoleGuard } from '../guards/role.guard';
import { UserRole } from '../services/role.service';
import { UsersListComponent } from './users-list/users-list.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserDetailsComponent } from './user-details/user-details.component';

export const USERS_ROUTES: Routes = [
  {
    path: '',
    component: UsersListComponent,
    canActivate: [RoleGuard],
    data: { roles: [UserRole.ADMIN] }
  },
  {
    path: 'create',
    component: UserCreateComponent,
    canActivate: [RoleGuard],
    data: { roles: [UserRole.ADMIN] }
  },
  {
    path: 'edit/:id',
    component: UserEditComponent,
    canActivate: [RoleGuard],
    data: { roles: [UserRole.ADMIN] }
  },
  {
    path: 'details/:id',
    component: UserDetailsComponent,
    canActivate: [RoleGuard],
    data: { roles: [UserRole.ADMIN] }
  }
]; 