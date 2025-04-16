import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export enum UserRole {
  ADMIN = 'admin',
  HR = 'hr',
  FINANCE = 'finance',
  PURCHASE = 'purchase',
  SALE = 'sale'
}

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiUrl = `${environment.apiUrl}/Role`;
  private currentRole: UserRole = UserRole.ADMIN; // Default role, should be set from login

  constructor(private http: HttpClient) { }

  getAllRoles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetAll`);
  }

  getRoleById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createRole(roleName: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/Create`, { roleName });
  }

  updateRole(id: string, roleName: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/Edit/${id}`, { id, roleName });
  }

  deleteRole(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Delete/${id}`);
  }

  setRole(role: UserRole) {
    this.currentRole = role;
    localStorage.setItem('userRole', role);
  }

  getRole(): UserRole {
    const storedRole = localStorage.getItem('userRole');
    return storedRole ? storedRole as UserRole : this.currentRole;
  }

  hasAccess(requiredRole: UserRole): boolean {
    const currentRole = this.getRole();
    
    // Admin has access to everything
    if (currentRole === UserRole.ADMIN) {
      return true;
    }

    // Check if current role matches required role
    return currentRole === requiredRole;
  }

  getMenuItems(): any[] {
    const role = this.getRole();
    
    const allMenuItems = [
      { title: 'Dashboard', icon: 'solar:widget-5-bold-duotone', route: '/dashboard', roles: [UserRole.ADMIN, UserRole.HR, UserRole.FINANCE, UserRole.PURCHASE, UserRole.SALE] },
      { 
        title: 'Products', icon: 'solar:t-shirt-bold-duotone', expanded: false,
        children: [
          { title: 'List', route: '/products/list' },
          { title: 'Grid', route: '/products/grid' },
          { title: 'Details', route: '/products/details' },
          { title: 'Edit', route: '/products/edit' },
          { title: 'Create', route: '/products/create' }
        ],
        roles: [UserRole.ADMIN]
      },
      { 
        title: 'Coverage Area', icon: 'solar:clipboard-list-bold-duotone', expanded: false,
        children: [
          { title: 'List', route: '/coverage-area/list' },
          { title: 'Edit', route: '/coverage-area/edit' },
          { title: 'Create', route: '/coverage-area/create' }
        ],
        roles: [UserRole.ADMIN]
      },
      { 
        title: 'Orders', icon: 'solar:bag-smile-bold-duotone', expanded: false,
        children: [
          { title: 'List', route: '/orders/list' },
          { title: 'Details', route: '/orders/details' }
        ],
        roles: [UserRole.ADMIN, UserRole.FINANCE, UserRole.SALE]
      },
      { 
        title: 'Users', icon: 'solar:users-group-two-rounded-bold-duotone', expanded: false,
        children: [
          { title: 'List', route: '/users' },
          { title: 'Details', route: '/users/details' },
          { title: 'Edit', route: '/users/edit' }
        ],
        roles: [UserRole.ADMIN]
      },
      { 
        title: 'Vendors', icon: 'solar:shop-bold-duotone', expanded: false,
        children: [
          { title: 'List', route: '/vendors/list' },
          { title: 'Details', route: '/vendors/details' },
          { title: 'Grid', route: '/vendors/grid' },
          { title: 'Edit', route: '/vendors/edit' },
          { title: 'Create', route: '/vendors/create' }
        ],
        roles: [UserRole.ADMIN, UserRole.PURCHASE]
      },
      { 
        title: 'Coupons', icon: 'solar:leaf-bold-duotone', expanded: false,
        children: [
          { title: 'List', route: '/coupons/list' },
          { title: 'Create', route: '/coupons/create' }
        ],
        roles: [UserRole.ADMIN]
      },
      { 
        title: 'Authentication', icon: 'solar:lock-keyhole-bold-duotone', expanded: false,
        children: [
          { title: 'Sign In', route: '/auth/signin' },
          { title: 'Sign Up', route: '/auth/signup' }
        ],
        roles: [UserRole.ADMIN]
      },
      { 
        title: 'Roles', icon: 'solar:user-speak-rounded-bold-duotone', expanded: false,
        children: [
          { title: 'List', route: '/roles' },
          { title: 'Create', route: '/roles/create' }
        ],
        roles: [UserRole.ADMIN]
      },
      { 
        title: 'News', icon: 'solar:chat-square-like-bold-duotone', expanded: false,
        children: [
          { title: 'List', route: '/news' },
          { title: 'Create', route: '/news/create' },
          { title: 'Grid', route: '/news/grid' }
        ],
        roles: [UserRole.ADMIN]
      },
      { 
        title: 'Career', icon: 'solar:case-minimalistic-bold-duotone', expanded: false,
        children: [
          { title: 'List', route: '/jobs' },
          { title: 'Create', route: '/jobs/create' },
          { title: 'Grid', route: '/career/grid' }
        ],
        roles: [UserRole.ADMIN, UserRole.HR]
      },
      { 
        title: 'Add Users', icon: 'solar:users-group-rounded-bold-duotone', expanded: false,
        children: [
          { title: 'List', route: '/add-users/list' },
          { title: 'Grid', route: '/add-users/grid' },
          { title: 'Details', route: '/add-users/details' },
          { title: 'Edit', route: '/add-users/edit' },
          { title: 'Create', route: '/add-users/create' }
        ],
        roles: [UserRole.ADMIN]
      },
      { 
        title: 'General Settings', icon: 'solar:settings-bold-duotone', expanded: false,
        children: [
          { title: 'List', route: '/settings/list' },
          { title: 'Grid', route: '/settings/grid' },
          { title: 'Details', route: '/settings/details' },
          { title: 'Edit', route: '/settings/edit' },
          { title: 'Create', route: '/settings/create' }
        ],
        roles: [UserRole.ADMIN]
      },
      { 
        title: 'Settings', icon: 'solar:settings-bold-duotone', route: '/settings',
        roles: [UserRole.ADMIN]
      }
    ];

    return allMenuItems.filter(item => {
      if (role === UserRole.ADMIN) return true;
      return item.roles.includes(role);
    });
  }
} 