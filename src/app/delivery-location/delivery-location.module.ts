import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeliveryLocationPageRoutingModule } from './delivery-location-routing.module';

import { DeliveryLocationPage } from './delivery-location.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeliveryLocationPageRoutingModule
  ],
  declarations: [DeliveryLocationPage]
})
export class DeliveryLocationPageModule {}
