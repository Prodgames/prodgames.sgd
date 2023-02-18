import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { SidebarModule } from 'ng-sidebar';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { environment } from 'src/environments/environment';
import { TokenInterceptorService } from './auth/token-interceptor.service';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { NgBootstrapModule } from './ng-bootstrap/ng-bootstrap.module';
import { ModalInfoComponent } from './components/modals/modal-info/modal-info.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { SafePipe } from './pipes/safe.pipe';

@NgModule({
  imports: [
    SidebarModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    // ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    HttpClientModule,
    ComponentsModule,
    NgBootstrapModule,
    RouterModule,
    AppRoutingModule,
    NgxDropzoneModule,
    NgxFileDropModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    SigninComponent,
    SignupComponent,
    // SafePipe
  ],
  entryComponents: [

  ],
  providers: [
    AngularFireModule,
    AngularFireAuthModule,
    AngularFireAuth,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
			// deps: [Router, ActivatedRoute],
      multi: true
    }
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
