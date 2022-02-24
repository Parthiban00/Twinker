import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderTrackModalPageRoutingModule } from './order-track-modal-routing.module';

import { OrderTrackModalPage } from './order-track-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderTrackModalPageRoutingModule
  ],
  declarations: [OrderTrackModalPage]
})
export class OrderTrackModalPageModule {}
