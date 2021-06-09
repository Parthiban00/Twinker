import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import { IonicModule } from '@ionic/angular';

import { RestaurantOwnerDashboardPageRoutingModule } from './restaurant-owner-dashboard-routing.module';

import { RestaurantOwnerDashboardPage } from './restaurant-owner-dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatGridListModule,
    RestaurantOwnerDashboardPageRoutingModule
  ],
  declarations: [RestaurantOwnerDashboardPage]
})
export class RestaurantOwnerDashboardPageModule {}
