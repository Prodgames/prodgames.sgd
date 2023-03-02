var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from "@angular/fire/auth";
import { environment } from "../../environments/environment";
var AuthService = /** @class */ (function () {
    function AuthService(router, afAuth, http) {
        this.router = router;
        this.afAuth = afAuth;
        this.http = http;
    }
    AuthService.prototype.signin = function (obj) {
        return this.http.post(environment.api + '/auth/client/signin', obj);
    };
    AuthService.prototype.signup = function (obj) {
        return this.http.post(environment.api + '/auth/client/signup', obj);
    };
    AuthService.prototype.test = function () {
        alert("test in service !");
        return this.http.get(environment.api + '/game');
    };
    AuthService.prototype.saveToken = function (token) {
        sessionStorage.setItem('token', token);
    };
    AuthService.prototype.saveUser = function (user) {
        sessionStorage.setItem('id', user.id);
        sessionStorage.setItem('email', user.email);
    };
    AuthService.prototype.getIdClient = function () {
        return sessionStorage.getItem('id');
    };
    AuthService.prototype.getToken = function () {
        return sessionStorage.getItem('token');
    };
    // googleLogin() {
    //   const auth = useAuth;
    //   const provider = new firebase.GoogleAuthProvider();
    //   return this.oAuthLogin(provider)
    //     .then(value => {
    //       console.log('Sucess', value),
    //         this.router.navigateByUrl('/profile');
    //     })
    //     .catch(error => {
    //       console.log('Something went wrong: ', error);
    //     });
    // }
    AuthService.prototype.logout = function () {
        var _this = this;
        this.afAuth.signOut().then(function () {
            _this.router.navigate(['/auth']);
        });
    };
    AuthService.prototype.oAuthLogin = function (provider) {
        return this.afAuth.signInWithPopup(provider);
    };
    AuthService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [Router,
            AngularFireAuth,
            HttpClient])
    ], AuthService);
    return AuthService;
}());
export { AuthService };
//# sourceMappingURL=auth.service.js.map