import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamesComponent } from './games/games.component';
import { MyGameComponent } from './my-game/my-game.component';
import { MyGamesComponent } from './my-games/my-games.component';

const routes: Routes = [
  { path: 'games',      component: GamesComponent },
  { path: 'my-games',      component: MyGamesComponent },
  { path: 'my-game',      component: MyGameComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
