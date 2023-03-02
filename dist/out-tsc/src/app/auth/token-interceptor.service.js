var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import Swal from 'sweetalert2';
var TokenInterceptorService = /** @class */ (function () {
    function TokenInterceptorService(authenticationService) {
        this.authenticationService = authenticationService;
        this.deviceInfo = null;
    }
    TokenInterceptorService.prototype.handleAuthError = function (err) {
        var _this = this;
        if (err.status === 401) {
            // this.openDialogInfo(
            // 	'Sesión caducada  !',
            // 	'Vuelva a iniciar sesión',
            // 	'error'
            // );
            sessionStorage.removeItem('token');
            Swal.fire('Ocurrió un problema !', err.error.message, 'error');
            setTimeout(function () {
                _this.authenticationService.logout();
            }, 500);
            return of(err.error.message);
        }
        return throwError(err);
    };
    TokenInterceptorService.prototype.intercept = function (req, next) {
        var _this = this;
        if (!req.url.includes('amazonaws')) {
            this.token = (this.authenticationService.getToken() !== undefined) ? this.authenticationService.getToken() : '';
            var tokenizeReq = req.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + this.token,
                }
            });
            return next.handle(tokenizeReq).pipe(catchError(function (x) { return _this.handleAuthError(x); }));
        }
        else {
            var tokenizeReq = req.clone();
            // tokenizeReq.headers.set('Accept', '*/*');
            // tokenizeReq.headers.set('x-ms-blob-type', 'BlockBlob');
            // tokenizeReq.headers.set('Content-Length', '0');
            // return next.handle(tokenizeReq);
            return next.handle(tokenizeReq).pipe(catchError(function (x) { return _this.handleAuthError(x); }));
        }
    };
    TokenInterceptorService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [AuthService])
    ], TokenInterceptorService);
    return TokenInterceptorService;
}());
export { TokenInterceptorService };
//# sourceMappingURL=token-interceptor.service.js.map