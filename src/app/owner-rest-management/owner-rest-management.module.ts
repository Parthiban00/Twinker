import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OwnerRestManagementPageRoutingModule } from './owner-rest-management-routing.module';

import { OwnerRestManagementPage } from './owner-rest-management.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OwnerRestManagementPageRoutingModule
  ],
  declarations: [OwnerRestManagementPage]
})
export class OwnerRestManagementPageModule {}
