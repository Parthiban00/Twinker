import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SetupLocationPage } from './setup-location.page';

const routes: Routes = [
  {
    path: '',
    component: SetupLocationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetupLocationPageRoutingModule {}
