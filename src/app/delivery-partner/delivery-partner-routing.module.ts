import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeliveryPartnerPage } from './delivery-partner.page';

const routes: Routes = [
  {
    path: '',
    component: DeliveryPartnerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliveryPartnerPageRoutingModule {}
