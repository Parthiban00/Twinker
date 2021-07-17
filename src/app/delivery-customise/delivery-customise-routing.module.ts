import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeliveryCustomisePage } from './delivery-customise.page';

const routes: Routes = [
  {
    path: '',
    component: DeliveryCustomisePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliveryCustomisePageRoutingModule {}
