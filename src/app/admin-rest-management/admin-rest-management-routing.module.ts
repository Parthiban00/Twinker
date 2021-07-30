import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminRestManagementPage } from './admin-rest-management.page';

const routes: Routes = [
  {
    path: '',
    component: AdminRestManagementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRestManagementPageRoutingModule {}
