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
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from "../../../auth/auth.service";
import { GameService } from "../../../game/game.service";
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
var ModalFileComponent = /** @class */ (function () {
    function ModalFileComponent(_authenticationService, _gameService) {
        this._authenticationService = _authenticationService;
        this._gameService = _gameService;
        this.outEvent = new EventEmitter();
        this.files = [];
        this.dataArrayToStorage = [];
    }
    ModalFileComponent.prototype.ngOnInit = function () {
        console.log(this.detail);
    };
    ModalFileComponent.prototype.onFileSelected = function (event) {
        this.file = event.target.files[0];
    };
    ModalFileComponent.prototype.emitEvent = function (param) {
        this.outEvent.emit(param);
    };
    ModalFileComponent.prototype.onSelect = function (event) {
        var _a;
        console.log(event);
        this.files = [];
        (_a = this.files).push.apply(_a, event.addedFiles);
        console.log(this.files);
        // this.file = event.target.files[0] as File;
    };
    ModalFileComponent.prototype.onRemove = function (event) {
        console.log(event);
        this.files.splice(this.files.indexOf(event), 1);
    };
    ModalFileComponent.prototype.changePropertyFile = function () {
        return __awaiter(this, void 0, void 0, function () {
            var fd, id;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.files[0]) {
                            Swal.fire('Importante !', 'Seleccionar una nueva imágen', 'info');
                        }
                        fd = new FormData();
                        return [4 /*yield*/, this._authenticationService.getIdClient()];
                    case 1:
                        id = _a.sent();
                        fd.append('property', this.detail.property);
                        fd.append('value', this.files[0], this.files[0].name);
                        fd.append('type', this.detail.type);
                        fd.append('environment', this.detail.environment);
                        fd.append('clientgame_', id);
                        this._gameService.changePropertyFile(this.detail.id, fd).subscribe(function (data) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                console.log(data);
                                if (data.success) {
                                    // this.getDetailGameByClient();
                                    this.emitEvent(true);
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
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], ModalFileComponent.prototype, "closeMyModal", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ModalFileComponent.prototype, "title", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ModalFileComponent.prototype, "detail", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], ModalFileComponent.prototype, "outEvent", void 0);
    ModalFileComponent = __decorate([
        Component({
            selector: 'app-modal-file',
            templateUrl: './modal-file.component.html',
            styleUrls: ['./modal-file.component.css']
        }),
        __metadata("design:paramtypes", [AuthService,
            GameService])
    ], ModalFileComponent);
    return ModalFileComponent;
}());
export { ModalFileComponent };
//# sourceMappingURL=modal-file.component.js.map