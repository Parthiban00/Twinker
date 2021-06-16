import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersAdminPage } from './orders-admin.page';

const routes: Routes = [
  {
    path: '',
    component: OrdersAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersAdminPageRoutingModule {}
