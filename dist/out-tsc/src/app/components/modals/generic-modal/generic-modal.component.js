var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef, Input, ViewEncapsulation } from "@angular/core";
import { ModalService } from "../../../services/modal.service";
var GenericModalComkponent = /** @class */ (function () {
    function GenericModalComkponent(modalService, el) {
        this.modalService = modalService;
        this.el = el;
        this.isOpen = false;
        this.element = el.nativeElement;
    }
    GenericModalComkponent.prototype.ngOnInit = function () {
        var _this = this;
        this.modalService.add(this);
        document.body.appendChild(this.element);
        this.element.addEventListener("click", function (el) {
            if (el.target.className === "br-modal") {
                _this.close();
            }
        });
    };
    GenericModalComkponent.prototype.ngOnDestroy = function () {
        this.modalService.remove(this);
        this.element.remove();
    };
    GenericModalComkponent.prototype.open = function () {
        this.element.style.display = "block";
        document.body.classList.add("br-modal-open");
        this.isOpen = true;
    };
    GenericModalComkponent.prototype.close = function () {
        this.element.style.display = "none";
        document.body.classList.remove("br-modal-open");
        this.isOpen = false;
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], GenericModalComkponent.prototype, "id", void 0);
    GenericModalComkponent = __decorate([
        Component({
            selector: "br-modal",
            templateUrl: "./generic-modal.component.html",
            styleUrls: ["./generic-modal.component.scss"],
            encapsulation: ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [ModalService, ElementRef])
    ], GenericModalComkponent);
    return GenericModalComkponent;
}());
export { GenericModalComkponent };
//# sourceMappingURL=generic-modal.component.js.map