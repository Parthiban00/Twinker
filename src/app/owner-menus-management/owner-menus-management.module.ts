import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OwnerMenusManagementPageRoutingModule } from './owner-menus-management-routing.module';

import { OwnerMenusManagementPage } from './owner-menus-management.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OwnerMenusManagementPageRoutingModule
  ],
  declarations: [OwnerMenusManagementPage]
})
export class OwnerMenusManagementPageModule {}
