import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuddyItemsPage } from './buddy-items.page';

const routes: Routes = [
  {
    path: '',
    component: BuddyItemsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuddyItemsPageRoutingModule {}
