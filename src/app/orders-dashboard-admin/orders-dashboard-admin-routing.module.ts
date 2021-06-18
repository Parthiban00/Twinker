import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersDashboardAdminPage } from './orders-dashboard-admin.page';

const routes: Routes = [
  {
    path: '',
    component: OrdersDashboardAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersDashboardAdminPageRoutingModule {}
