import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeliveryPartnerDashboardPage } from './delivery-partner-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DeliveryPartnerDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliveryPartnerDashboardPageRoutingModule {}
