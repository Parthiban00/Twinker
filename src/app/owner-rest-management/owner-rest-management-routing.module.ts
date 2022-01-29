import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OwnerRestManagementPage } from './owner-rest-management.page';

const routes: Routes = [
  {
    path: '',
    component: OwnerRestManagementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OwnerRestManagementPageRoutingModule {}
