var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { SidebarModule } from 'ng-sidebar';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { environment } from "../environments/environment";
import { TokenInterceptorService } from './auth/token-interceptor.service';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { NgBootstrapModule } from './ng-bootstrap/ng-bootstrap.module';
import { NgxFileDropModule } from 'ngx-file-drop';
import { NgxDropzoneModule } from 'ngx-dropzone';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
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
            ],
            entryComponents: [],
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
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map