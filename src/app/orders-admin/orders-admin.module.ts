import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { IonicModule } from '@ionic/angular';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import { OrdersAdminPageRoutingModule } from './orders-admin-routing.module';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { OrdersAdminPage } from './orders-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdersAdminPageRoutingModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [OrdersAdminPage]
})
export class OrdersAdminPageModule {}
