import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SidebarComponent {

  menuItems = [
    { title: 'Dashboard', icon: 'bi bi-speedometer2', route: '/dashboard' },
    { 
      title: 'Users', icon: 'bi bi-people', expanded: false, // ✅ Added expanded
      children: [
        { title: 'All Users', route: '/users' },
        { title: 'Add User', route: '/users/add' }
      ] 
    },
    { 
      title: 'Products', icon: 'bi bi-box', expanded: false, // ✅ Added expanded
      children: [
        { title: 'All Products', route: '/products/all' },
        { title: 'Add Product', route: '/products/add' }
      ]
    },
    { title: 'Orders', icon: 'bi bi-cart', route: '/orders' },
    { title: 'Settings', icon: 'bi bi-gear', route: '/settings' }
  ];

  toggleMenu(item: any) {
    this.menuItems.forEach(menu => {
      if (menu !== item && menu.children) {
        menu.expanded = false; // Collapse other menus
      }
    });

    item.expanded = !item.expanded; // Toggle the clicked menu
  }

  logout() {
    localStorage.removeItem('token');
    location.reload();
  }

}
