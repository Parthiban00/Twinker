import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductPagePage } from './product-page.page';

const routes: Routes = [
  {
    path: '',
    component: ProductPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductPagePageRoutingModule {}
