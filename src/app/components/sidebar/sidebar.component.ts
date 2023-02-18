import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

// ni ni-align-left-2 text-default
// <i class="bi bi-speedometer2"></i>
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Inicio', icon: 'bi-house-door text-primary', class: 'weight-icon' },
  { path: '/library/games', title: 'Biblioteca', icon: 'bi-collection text-orange', class: 'weight-icon' },
  { path: '/library/my-games', title: 'Mis juegos', icon: 'bi-dice-3 text-green', class: 'weight-icon' },
  { path: '/user-profile', title: 'Reportes', icon: 'bi-pie-chart-fill text-info', class: '' },
  { path: '/credits/gifts', title: 'Créditos', icon: 'bi-gift text-red', class: 'weight-icon' },
  // { path: '/login', title: 'Login', icon: 'ni-key-25 text-info', class: '' },
  // { path: '/register', title: 'Register', icon: 'ni-circle-08 text-pink', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;
  @Output() collapsed = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }

  closeSidebar(){
    this.collapsed.emit();
  }
}
