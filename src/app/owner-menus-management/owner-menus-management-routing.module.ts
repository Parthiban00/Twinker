import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OwnerMenusManagementPage } from './owner-menus-management.page';

const routes: Routes = [
  {
    path: '',
    component: OwnerMenusManagementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OwnerMenusManagementPageRoutingModule {}
