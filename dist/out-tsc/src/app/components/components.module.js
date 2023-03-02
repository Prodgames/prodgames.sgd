var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalInfoComponent } from './modals/modal-info/modal-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxFileDropModule } from 'ngx-file-drop';
import { ModalShareComponent } from './modals/modal-share/modal-share.component';
var ComponentsModule = /** @class */ (function () {
    function ComponentsModule() {
    }
    ComponentsModule = __decorate([
        NgModule({
            imports: [
                FormsModule,
                ReactiveFormsModule,
                CommonModule,
                RouterModule,
                NgbModule,
                NgxDropzoneModule,
                NgxFileDropModule
            ],
            declarations: [
                FooterComponent,
                NavbarComponent,
                SidebarComponent,
                ModalInfoComponent,
                ModalShareComponent
            ],
            exports: [
                FooterComponent,
                NavbarComponent,
                SidebarComponent,
                ModalInfoComponent
            ],
            entryComponents: [
                ModalInfoComponent
            ],
            providers: [
                ModalInfoComponent
            ]
        })
    ], ComponentsModule);
    return ComponentsModule;
}());
export { ComponentsModule };
//# sourceMappingURL=components.module.js.map