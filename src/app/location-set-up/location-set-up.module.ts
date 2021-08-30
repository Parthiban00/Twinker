import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocationSetUpPageRoutingModule } from './location-set-up-routing.module';

import { LocationSetUpPage } from './location-set-up.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocationSetUpPageRoutingModule
  ],
  declarations: [LocationSetUpPage]
})
export class LocationSetUpPageModule {}
