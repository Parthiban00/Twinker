import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuStatusPage } from './menu-status.page';

const routes: Routes = [
  {
    path: '',
    component: MenuStatusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuStatusPageRoutingModule {}
