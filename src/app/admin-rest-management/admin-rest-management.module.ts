import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminRestManagementPageRoutingModule } from './admin-rest-management-routing.module';

import { AdminRestManagementPage } from './admin-rest-management.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminRestManagementPageRoutingModule
  ],
  declarations: [AdminRestManagementPage]
})
export class AdminRestManagementPageModule {}
