var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { NgbAccordionModule, NgbModalModule, NgbModule, NgbNavModule, NgbToastModule, } from '@ng-bootstrap/ng-bootstrap';
var NgBootstrapComponents = [
    NgbModule, NgbToastModule, NgbModalModule, NgbNavModule, NgbAccordionModule
];
var NgBootstrapModule = /** @class */ (function () {
    function NgBootstrapModule() {
    }
    NgBootstrapModule = __decorate([
        NgModule({
            declarations: [],
            imports: [
                NgBootstrapComponents,
            ],
            exports: [
                NgBootstrapComponents,
            ]
        })
    ], NgBootstrapModule);
    return NgBootstrapModule;
}());
export { NgBootstrapModule };
//# sourceMappingURL=ng-bootstrap.module.js.map