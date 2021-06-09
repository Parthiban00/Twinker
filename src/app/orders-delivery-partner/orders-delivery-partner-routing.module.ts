import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersDeliveryPartnerPage } from './orders-delivery-partner.page';

const routes: Routes = [
  {
    path: '',
    component: OrdersDeliveryPartnerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersDeliveryPartnerPageRoutingModule {}
