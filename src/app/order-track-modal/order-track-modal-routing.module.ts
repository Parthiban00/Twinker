import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderTrackModalPage } from './order-track-modal.page';

const routes: Routes = [
  {
    path: '',
    component: OrderTrackModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderTrackModalPageRoutingModule {}
