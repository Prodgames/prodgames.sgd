import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreditRoutingModule } from './credit-routing.module';
import { CreditsComponent } from './credits/credits.component';
import { GiftsComponent } from './gifts/gifts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CreditsComponent, GiftsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CreditRoutingModule
  ]
})
export class CreditModule { }
