var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GameRoutingModule } from "./game-routing.module";
import { GamesComponent } from "./games/games.component";
import { MyGameComponent } from "./my-game/my-game.component";
import { NgxFileDropModule } from "ngx-file-drop";
import { ManagementWebComponent } from "./my-game/management-web/management-web.component";
import { ManagementGameComponent } from "./my-game/management-game/management-game.component";
import { SafePipe } from "../pipes/safe.pipe";
import { PropertyComponent } from "./my-game/property/property.component";
import { ReactiveFormsModule } from "@angular/forms";
import { GameModalComponent } from "./game-modal/game-modal.component";
import { GenericModalComkponent } from "../components/modals/generic-modal/generic-modal.component";
var GameModule = /** @class */ (function () {
    function GameModule() {
    }
    GameModule = __decorate([
        NgModule({
            declarations: [
                GamesComponent,
                MyGameComponent,
                ManagementWebComponent,
                ManagementGameComponent,
                SafePipe,
                PropertyComponent,
                GameModalComponent,
                GenericModalComkponent
            ],
            imports: [
                CommonModule,
                GameRoutingModule,
                NgxFileDropModule,
                ReactiveFormsModule,
            ],
        })
    ], GameModule);
    return GameModule;
}());
export { GameModule };
//# sourceMappingURL=game.module.js.map