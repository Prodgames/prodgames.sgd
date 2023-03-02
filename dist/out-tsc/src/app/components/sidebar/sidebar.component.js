var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, EventEmitter, Output } from "@angular/core";
import { Router } from "@angular/router";
export var ROUTES = [
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
var SidebarComponent = /** @class */ (function () {
    function SidebarComponent(router) {
        this.router = router;
        this.isCollapsed = true;
        this.collapsed = new EventEmitter();
    }
    SidebarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.menuItems = ROUTES.filter(function (menuItem) { return menuItem; });
        this.router.events.subscribe(function (event) {
            _this.isCollapsed = true;
        });
    };
    SidebarComponent.prototype.closeSidebar = function () {
        this.collapsed.emit();
    };
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], SidebarComponent.prototype, "collapsed", void 0);
    SidebarComponent = __decorate([
        Component({
            selector: "app-sidebar",
            templateUrl: "./sidebar.component.html",
            styleUrls: ["./sidebar.component.scss"],
        }),
        __metadata("design:paramtypes", [Router])
    ], SidebarComponent);
    return SidebarComponent;
}());
export { SidebarComponent };
//# sourceMappingURL=sidebar.component.js.map