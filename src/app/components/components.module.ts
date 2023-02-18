import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalInfoComponent } from './modals/modal-info/modal-info.component';
import { ModalGiftComponent } from './modals/modal-gift/modal-gift.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxFileDropModule } from 'ngx-file-drop';
import { ModalFileComponent } from './modals/modal-file/modal-file.component';
import { ModalShareComponent } from './modals/modal-share/modal-share.component';
@NgModule({
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
    ModalGiftComponent,
    ModalFileComponent,
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
export class ComponentsModule { }
