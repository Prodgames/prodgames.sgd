import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GiftsComponent } from './gifts/gifts.component';

const routes: Routes = [
  { path: 'gifts',      component: GiftsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreditRoutingModule { }
