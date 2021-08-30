import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangeLocationPage } from './change-location.page';

const routes: Routes = [
  {
    path: '',
    component: ChangeLocationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangeLocationPageRoutingModule {}
