import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdersDashboardAdminPageRoutingModule } from './orders-dashboard-admin-routing.module';

import { OrdersDashboardAdminPage } from './orders-dashboard-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdersDashboardAdminPageRoutingModule
  ],
  declarations: [OrdersDashboardAdminPage]
})
export class OrdersDashboardAdminPageModule {}
