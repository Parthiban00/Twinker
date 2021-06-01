import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeliveryPartnerPageRoutingModule } from './delivery-partner-routing.module';

import { DeliveryPartnerPage } from './delivery-partner.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeliveryPartnerPageRoutingModule
  ],
  declarations: [DeliveryPartnerPage]
})
export class DeliveryPartnerPageModule {}
