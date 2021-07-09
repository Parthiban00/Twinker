import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeliveryLocationPage } from './delivery-location.page';

const routes: Routes = [
  {
    path: '',
    component: DeliveryLocationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliveryLocationPageRoutingModule {}
