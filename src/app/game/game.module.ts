import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GamesComponent } from './games/games.component';
import { MyGamesComponent } from './my-games/my-games.component';
import { MyGameComponent } from './my-game/my-game.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { ManagementWebComponent } from './my-game/management-web/management-web.component';
import { ManagementGameComponent } from './my-game/management-game/management-game.component';
import { SafePipe } from '../pipes/safe.pipe';


@NgModule({
  declarations: [GamesComponent, MyGamesComponent, MyGameComponent, ManagementWebComponent, ManagementGameComponent, SafePipe],
  imports: [
    CommonModule,
    GameRoutingModule,
    NgxFileDropModule
  ]
})
export class GameModule { }
