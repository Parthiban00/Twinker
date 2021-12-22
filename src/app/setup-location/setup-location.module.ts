import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SetupLocationPageRoutingModule } from './setup-location-routing.module';

import { SetupLocationPage } from './setup-location.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SetupLocationPageRoutingModule
  ],
  declarations: [SetupLocationPage]
})
export class SetupLocationPageModule {}
