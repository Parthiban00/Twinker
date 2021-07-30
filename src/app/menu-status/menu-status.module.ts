import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuStatusPageRoutingModule } from './menu-status-routing.module';

import { MenuStatusPage } from './menu-status.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuStatusPageRoutingModule
  ],
  declarations: [MenuStatusPage]
})
export class MenuStatusPageModule {}
