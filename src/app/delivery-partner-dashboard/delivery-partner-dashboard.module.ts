import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import { IonicModule } from '@ionic/angular';

import { DeliveryPartnerDashboardPageRoutingModule } from './delivery-partner-dashboard-routing.module';

import { DeliveryPartnerDashboardPage } from './delivery-partner-dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatGridListModule,
    DeliveryPartnerDashboardPageRoutingModule
  ],
  declarations: [DeliveryPartnerDashboardPage]
})
export class DeliveryPartnerDashboardPageModule {}
