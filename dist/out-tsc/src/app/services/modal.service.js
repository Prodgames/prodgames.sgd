var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from "@angular/core";
var ModalService = /** @class */ (function () {
    function ModalService() {
        this.modals = [];
    }
    ModalService.prototype.add = function (modal) {
        if (!modal.id || this.modals.find(function (x) { return x.id === modal.id; })) {
            throw new Error("modal must have a unique id attribute");
        }
        this.modals.push(modal);
    };
    ModalService.prototype.remove = function (modal) {
        this.modals = this.modals.filter(function (x) { return x === modal; });
    };
    ModalService.prototype.open = function (id) {
        var modal = this.modals.find(function (x) { return x.id === id; });
        if (!modal) {
            throw new Error("Modal '" + id + "' not found");
        }
        modal.open();
    };
    ModalService.prototype.close = function () {
        var modal = this.modals.find(function (x) { return x.isOpen; });
        modal === null || modal === void 0 ? void 0 : modal.close();
    };
    ModalService = __decorate([
        Injectable({ providedIn: "root" })
    ], ModalService);
    return ModalService;
}());
export { ModalService };
//# sourceMappingURL=modal.service.js.map