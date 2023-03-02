var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalInfoComponent } from "../../components/modals/modal-info/modal-info.component";
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';
var Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: function (toast) {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
});
var SigninComponent = /** @class */ (function () {
    function SigninComponent(modalService, router, afAuth, authenticationService) {
        this.modalService = modalService;
        this.router = router;
        this.afAuth = afAuth;
        this.authenticationService = authenticationService;
    }
    SigninComponent.prototype.ngOnInit = function () {
        // this.open("Hola");
        // warning, error, success, info, question
        /* Swal.fire({
          title: 'Question!',
          text: 'Do you want to continue',
          icon: 'question',
          confirmButtonText: 'OK',
          denyButtonText: 'No',
          cancelButtonText: 'Cancelar',
          showConfirmButton: true,
          showDenyButton: true,
          showCancelButton: true
        }).then((result) => {
          console.log("result: ");
          console.log(result);
          if (result.isConfirmed) {
            Swal.fire('Saved!', '', 'success')
          } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info')
          } else if (result.isDismissed) {
            Swal.fire('Changes are not saved', '', 'info')
          }
        }) */
        // Toast.fire({
        //   icon: 'success',
        //   title: 'Signed in successfully'
        // })
    };
    SigninComponent.prototype.signIn = function () {
        var _this = this;
        this.afAuth.signInWithEmailAndPassword(this.email, this.password)
            .then(function (value) { return __awaiter(_this, void 0, void 0, function () {
            var token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.email = '';
                        this.password = '';
                        console.log(value);
                        if (!value.user.emailVerified) return [3 /*break*/, 2];
                        return [4 /*yield*/, value.user.getIdToken()];
                    case 1:
                        token = _a.sent();
                        console.log(token);
                        this.authenticationService.saveToken(token);
                        this.router.navigate(['/dashboard']);
                        return [3 /*break*/, 3];
                    case 2:
                        // Popup de confirmacion de correo
                        Swal.fire({
                            title: 'Confirmación de correo',
                            text: 'Te enviamos un correo electrónico, verifica tu identidad para poder iniciar sesión',
                            icon: 'info',
                            confirmButtonText: 'Reenviar',
                            cancelButtonText: 'Cerrar',
                            showConfirmButton: true,
                            showCancelButton: true
                        }).then(function (result) {
                            console.log("result: ");
                            console.log(result);
                            if (result.isConfirmed) {
                                Swal.fire('Confirmación de correo', 'Te enviamos un correo electrónico, verifica tu identidad para poder iniciar sesión', 'success');
                            }
                        });
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); })
            .catch(function (err) {
            // Informar error
            console.log('Something went wrong: ', err.message);
        });
    };
    SigninComponent.prototype.signInApi = function () {
        var _this = this;
        var obj = {
            email: this.email,
            password: this.password
        };
        this.authenticationService.signin(obj).subscribe(function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log(data);
                if (data.success) {
                    // this.authenticationService.saveToken(data.data);
                    this.authenticationService.saveToken(data.data.token);
                    this.authenticationService.saveUser(data.data);
                    this.router.navigate(['/dashboard']);
                }
                else {
                    Swal.fire('Credenciales incorrectas', 'El correo ingresado ya fue registrado', 'error');
                }
                return [2 /*return*/];
            });
        }); }, function (err) {
            Swal.fire('Ocurrió un problema !', err.error.message, 'error');
            // if (err.status === 401 || err.status === 403) {
            // }
            console.log(err);
        });
    };
    SigninComponent.prototype.testApi = function () {
        var _this = this;
        this.authenticationService.test().subscribe(function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log(data);
                return [2 /*return*/];
            });
        }); }, function (err) {
            if (err.status === 401 || err.status === 403) {
            }
            console.log(err);
        });
    };
    SigninComponent.prototype.open = function (title) {
        var modalRef = this.modalService.open(ModalInfoComponent);
        modalRef.componentInstance.closeMyModal = function () {
            modalRef.close();
        };
        modalRef.componentInstance.title = title;
        modalRef.componentInstance.outEvent.subscribe(function (res) {
            console.log('res: ', res);
        });
    };
    SigninComponent = __decorate([
        Component({
            selector: 'app-signin',
            templateUrl: './signin.component.html',
            styleUrls: ['./signin.component.css']
        }),
        __metadata("design:paramtypes", [NgbModal,
            Router,
            AngularFireAuth,
            AuthService])
    ], SigninComponent);
    return SigninComponent;
}());
export { SigninComponent };
//# sourceMappingURL=signin.component.js.map