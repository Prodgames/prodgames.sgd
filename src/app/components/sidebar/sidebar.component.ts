import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  {
    path: "/library/games",
    title: "Biblioteca",
    icon: "bi-collection text-orange",
    class: "weight-icon",
  },
  {
    path: "/library/my-games",
    title: "Mis juegos",
    icon: "bi-dice-3 text-green",
    class: "weight-icon",
  },
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  public isCollapsed = true;
  @Output() collapsed = new EventEmitter();

  constructor(private router: Router) {}

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }

  closeSidebar() {
    this.collapsed.emit();
  }
}
