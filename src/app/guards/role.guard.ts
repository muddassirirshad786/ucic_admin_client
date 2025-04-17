import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { RoleService, UserRole } from '../services/role.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private roleService: RoleService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const requiredRoles = route.data['roles'] as UserRole[];
    const currentRole = this.roleService.getRole();

    // Admin has access to everything
    if (currentRole === UserRole.ADMIN) {
      return true;
    }

    // Check if user's role is in the required roles
    if (requiredRoles && requiredRoles.includes(currentRole)) {
      return true;
    }

    // If not authorized, redirect to dashboard
    this.router.navigate(['/dashboard']);
    return false;
  }
} 