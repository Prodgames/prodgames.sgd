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

@NgModule({
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
export class GameModule {}
