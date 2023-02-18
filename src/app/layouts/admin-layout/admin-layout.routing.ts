import { Routes } from '@angular/router';

import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { GamesComponent } from 'src/app/game/games/games.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: GamesComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    {
      path: 'library',
      children: [
        {
          path: '',
          loadChildren: '../../game/game.module#GameModule'
        }
      ]
    },
];
