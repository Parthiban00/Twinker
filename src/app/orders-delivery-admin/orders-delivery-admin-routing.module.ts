import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersDeliveryAdminPage } from './orders-delivery-admin.page';

const routes: Routes = [
  {
    path: '',
    component: OrdersDeliveryAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersDeliveryAdminPageRoutingModule {}
