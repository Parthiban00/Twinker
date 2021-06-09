import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersManagementPage } from './orders-management.page';

const routes: Routes = [
  {
    path: '',
    component: OrdersManagementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersManagementPageRoutingModule {}
