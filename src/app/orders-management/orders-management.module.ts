import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { IonicModule } from '@ionic/angular';
import {MatButtonModule} from '@angular/material/button';
import { OrdersManagementPageRoutingModule } from './orders-management-routing.module';
import {MatExpansionModule} from '@angular/material/expansion';
import { OrdersManagementPage } from './orders-management.page';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,

    OrdersManagementPageRoutingModule
  ],
  declarations: [OrdersManagementPage]
})
export class OrdersManagementPageModule {}
