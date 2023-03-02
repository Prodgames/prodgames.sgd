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
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from "../../../auth/auth.service";
import { ModalFileComponent } from "../../../components/modals/modal-file/modal-file.component";
import { environment } from "../../../../environments/environment";
import Swal from 'sweetalert2';
import { GameService } from '../../game.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
var ManagementGameComponent = /** @class */ (function () {
    function ManagementGameComponent(activatedRoute, modalService, _authenticationService, _gameService, _sanitizer) {
        this.activatedRoute = activatedRoute;
        this.modalService = modalService;
        this._authenticationService = _authenticationService;
        this._gameService = _gameService;
        this._sanitizer = _sanitizer;
        this.urlGame = '';
        this.token = '';
        this.showGame = false;
        this.numberLoad = 0;
    }
    ManagementGameComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.id = params.clientgame_id;
        });
        this.getDetailGameByClient(this.id);
        // this.openNew();
        // var iframe = document.getElementById("my-iframe");
        // var queryStr = window.location.search;
        // var url = window.location.href.replace(queryStr, "");
        // iframe.src = iframe.src + "?client_url=" + url;
    };
    ManagementGameComponent.prototype.ngAfterContentChecked = function () {
    };
    ManagementGameComponent.prototype.openTest = function () {
        window.open(this.urlGame, 'popup', 'directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=420px,height=640px,frameborder=0');
        return false;
    };
    ManagementGameComponent.prototype.openNew = function () {
        // window.open('http://kanishkkunal.com','popup','width=100%,height=100%,frameborder=0'); return false;
        var win = window.open();
        win.document.write('<iframe width="400px" height="640px" src=' + this.urlGame + ' allowfullscreen></iframe>');
    };
    // frameborder="0" style="width: 100%; height: 100%; margin: auto;"
    ManagementGameComponent.prototype.getDetailGameByClient = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        // var iframe:any = document.getElementById('game');
                        // iframe.contentWindow.location.reload();
                        // const id = await this._authenticationService.getIdClient();
                        _a = this;
                        return [4 /*yield*/, this._authenticationService.getToken()];
                    case 1:
                        // var iframe:any = document.getElementById('game');
                        // iframe.contentWindow.location.reload();
                        // const id = await this._authenticationService.getIdClient();
                        _a.token = _b.sent();
                        this._gameService.getDetailGameByClient(id, 'unity').subscribe(function (data) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                console.log(data);
                                if (data.success) {
                                    this.details = data.data;
                                    this.numberLoad++;
                                    if (this.numberLoad < 2) {
                                        this.showGame = true;
                                    }
                                }
                                return [2 /*return*/];
                            });
                        }); }, function (err) {
                            if (err.status === 401 || err.status === 403) {
                            }
                            console.log(err);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    ManagementGameComponent.prototype.changeGeneric = function (detail) {
        var _this = this;
        var obj = {
            property: detail.property,
            value: detail.value,
            type: detail.type
        };
        this._gameService.changePropertyGeneric(detail.id, obj).subscribe(function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log(data);
                if (data.success) {
                    this.getDetailGameByClient(this.id);
                    Swal.fire('Cambio exitoso', data.message, 'success');
                }
                else {
                    Swal.fire('Ocurrió un problema', data.message, 'error');
                }
                return [2 /*return*/, data];
            });
        }); }, function (err) {
            console.log(err);
            Swal.fire('Ocurrió un problema !', err.error.message, 'error');
            return err;
        });
    };
    ManagementGameComponent.prototype.changeValueGeneric = function (detail) {
        var _this = this;
        Swal.fire({
            backdrop: false,
            title: 'Importante !',
            text: 'Ingrese el nuevo valor de "' + detail.property + '"',
            // icon: 'info',
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            showConfirmButton: true,
            showCancelButton: true,
            input: 'textarea',
            inputAttributes: {
                autocapitalize: 'off'
            },
            preConfirm: function (textarea) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            console.log(textarea);
                            detail.value = textarea;
                            return [4 /*yield*/, this.changeGeneric(detail)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            }); },
            allowOutsideClick: function () { return !Swal.isLoading(); }
        }).then(function (result) {
            console.log(result);
            if (result.isConfirmed) {
                // this.showGame = false;
                // this.showGame = true;
                // Swal.fire({
                //   title: `${result.value.file}'s avatar`,
                //   imageUrl: result.value.file
                // })
            }
        });
    };
    ManagementGameComponent.prototype.changeValueFile = function (detail) {
        var _this = this;
        var modalRef = this.modalService.open(ModalFileComponent);
        modalRef.componentInstance.closeMyModal = function () {
            modalRef.close();
            _this.getDetailGameByClient(_this.id);
        };
        modalRef.componentInstance.title = 'Editar imágen';
        modalRef.componentInstance.type = 'edit';
        modalRef.componentInstance.detail = detail;
        modalRef.componentInstance.outEvent.subscribe(function (res) {
            modalRef.close();
            // this.showGame = false;
            // this.showGame = true;
            _this.getDetailGameByClient(_this.id);
        });
    };
    ManagementGameComponent.prototype.onFileSelected = function (event) {
        this.file = event.target.files[0];
    };
    ManagementGameComponent.prototype.gameURL = function () {
        var urlGame = environment.urlGame + '?token=' + this.token;
        // this.urlGame = "http://localhost/ruleta-sg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJwcm9kZ2FtZXNAZ21haWwuY29tIiwicm9sZXMiOiJDIiwiaWF0IjoxNjI2OTgwNTg1LCJleHAiOjE2MjY5ODQxODV9.TbjBsYC4JxCxWweOKs59v6jPfmxAFCElwKUTq0Q2hPM";
        // return this._sanitizer.bypassSecurityTrustResourceUrl(urlGame);
        // alert("gameURL");
        this.urlGame = urlGame;
        return this._sanitizer.bypassSecurityTrustResourceUrl(urlGame);
    };
    ManagementGameComponent = __decorate([
        Component({
            selector: 'app-management-game',
            templateUrl: './management-game.component.html',
            styleUrls: ['./management-game.component.css']
        }),
        __metadata("design:paramtypes", [ActivatedRoute,
            NgbModal,
            AuthService,
            GameService,
            DomSanitizer])
    ], ManagementGameComponent);
    return ManagementGameComponent;
}());
export { ManagementGameComponent };
//# sourceMappingURL=management-game.component.js.map