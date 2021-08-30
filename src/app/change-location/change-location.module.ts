import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangeLocationPageRoutingModule } from './change-location-routing.module';

import { ChangeLocationPage } from './change-location.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangeLocationPageRoutingModule,

  ],
  declarations: [ChangeLocationPage]
})
export class ChangeLocationPageModule {}
