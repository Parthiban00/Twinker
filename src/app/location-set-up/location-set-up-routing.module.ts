import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocationSetUpPage } from './location-set-up.page';

const routes: Routes = [
  {
    path: '',
    component: LocationSetUpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocationSetUpPageRoutingModule {}
