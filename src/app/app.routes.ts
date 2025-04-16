import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { authGuard } from './auth/authguard/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { UserRole } from './services/role.service';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
        canActivate: [RoleGuard],
        data: { roles: [UserRole.ADMIN, UserRole.HR, UserRole.FINANCE, UserRole.PURCHASE, UserRole.SALE] }
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./users/users.module').then((m) => m.UsersModule),
        canActivate: [RoleGuard],
        data: { roles: [UserRole.ADMIN] }
      },
      {
        path: 'news',
        loadChildren: () =>
          import('./news/news.module').then((m) => m.NewsModule),
        canActivate: [RoleGuard],
        data: { roles: [UserRole.ADMIN] }
      },
      {
        path: 'jobs',
        loadChildren: () =>
          import('./jobs/jobs.module').then((m) => m.JobsModule),
        canActivate: [RoleGuard],
        data: { roles: [UserRole.ADMIN, UserRole.HR] }
      },
      {
        path: 'vendors',
        loadChildren: () =>
          import('./vendors/vendors.module').then((m) => m.VendorsModule),
        canActivate: [RoleGuard],
        data: { roles: [UserRole.ADMIN, UserRole.PURCHASE] }
      },
      {
        path: 'roles',
        loadChildren: () =>
          import('./roles/roles.module').then((m) => m.RolesModule),
        canActivate: [RoleGuard],
        data: { roles: [UserRole.ADMIN] }
      },
      // Temporarily commenting out modules that don't exist yet
      /* 
      {
        path: 'orders',
        loadChildren: () =>
          import('./orders/orders.module').then((m) => m.OrdersModule),
        canActivate: [RoleGuard],
        data: { roles: [UserRole.ADMIN, UserRole.FINANCE, UserRole.SALE] }
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./products/products.module').then((m) => m.ProductsModule),
        canActivate: [RoleGuard],
        data: { roles: [UserRole.ADMIN] }
      },
      {
        path: 'coverage-area',
        loadChildren: () =>
          import('./coverage-area/coverage-area.module').then((m) => m.CoverageAreaModule),
        canActivate: [RoleGuard],
        data: { roles: [UserRole.ADMIN] }
      },
      {
        path: 'coupons',
        loadChildren: () =>
          import('./coupons/coupons.module').then((m) => m.CouponsModule),
        canActivate: [RoleGuard],
        data: { roles: [UserRole.ADMIN] }
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./settings/settings.module').then((m) => m.SettingsModule),
        canActivate: [RoleGuard],
        data: { roles: [UserRole.ADMIN] }
      },
      {
        path: 'add-users',
        loadChildren: () =>
          import('./add-users/add-users.module').then((m) => m.AddUsersModule),
        canActivate: [RoleGuard],
        data: { roles: [UserRole.ADMIN] }
      },
      */
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];
