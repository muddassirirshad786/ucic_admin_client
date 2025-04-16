import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SidebarComponent implements OnInit {
  menuItems: any[] = [];

  constructor(private roleService: RoleService) {}

  ngOnInit() {
    this.menuItems = this.roleService.getMenuItems();
  }

  toggleMenu(item: any) {
    this.menuItems.forEach(menu => {
      if (menu !== item && menu.children) {
        menu.expanded = false;
      }
    });

    item.expanded = !item.expanded;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    location.reload();
  }
}
