import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { IonicModule } from '@ionic/angular';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { OrdersDeliveryPartnerPageRoutingModule } from './orders-delivery-partner-routing.module';

import { OrdersDeliveryPartnerPage } from './orders-delivery-partner.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatButtonToggleModule,
    NgbModule,
    OrdersDeliveryPartnerPageRoutingModule
  ],
  declarations: [OrdersDeliveryPartnerPage]
})
export class OrdersDeliveryPartnerPageModule {}
