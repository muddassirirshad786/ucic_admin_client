import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { authGuard } from './auth/authguard/auth.guard';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: MainLayoutComponent, // ✅ Sidebar contains <router-outlet>
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./users/users.module').then((m) => m.UsersModule),
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // ✅ Redirect to dashboard by default
    ],
  },
  { path: '**', redirectTo: 'dashboard' }, // ✅ Redirect unknown routes
];
