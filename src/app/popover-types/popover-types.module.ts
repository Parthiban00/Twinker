import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PopoverTypesPageRoutingModule } from './popover-types-routing.module';

import { PopoverTypesPage } from './popover-types.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PopoverTypesPageRoutingModule
  ],
  declarations: [PopoverTypesPage]
})
export class PopoverTypesPageModule {}
