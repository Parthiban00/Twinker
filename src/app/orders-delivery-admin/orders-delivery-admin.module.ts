import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { IonicModule } from '@ionic/angular';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { OrdersDeliveryAdminPageRoutingModule } from './orders-delivery-admin-routing.module';

import { OrdersDeliveryAdminPage } from './orders-delivery-admin.page';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatButtonToggleModule,
    NgbModule,
    OrdersDeliveryAdminPageRoutingModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule

  ],
  declarations: [OrdersDeliveryAdminPage]
})
export class OrdersDeliveryAdminPageModule {}
