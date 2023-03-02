var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, EventEmitter, Input, Output } from '@angular/core';
var ModalShareComponent = /** @class */ (function () {
    function ModalShareComponent() {
        this.outEvent = new EventEmitter();
    }
    ModalShareComponent.prototype.ngOnInit = function () {
    };
    ModalShareComponent.prototype.emitEvent = function (param) {
        this.outEvent.emit(param);
    };
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], ModalShareComponent.prototype, "closeMyModal", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ModalShareComponent.prototype, "title", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], ModalShareComponent.prototype, "outEvent", void 0);
    ModalShareComponent = __decorate([
        Component({
            selector: 'app-modal-share',
            templateUrl: './modal-share.component.html',
            styleUrls: ['./modal-share.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], ModalShareComponent);
    return ModalShareComponent;
}());
export { ModalShareComponent };
//# sourceMappingURL=modal-share.component.js.map