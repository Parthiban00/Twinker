import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestaurantOwnerDashboardPage } from './restaurant-owner-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: RestaurantOwnerDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestaurantOwnerDashboardPageRoutingModule {}
