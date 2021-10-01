import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PopoverTypesPage } from './popover-types.page';

const routes: Routes = [
  {
    path: '',
    component: PopoverTypesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PopoverTypesPageRoutingModule {}
