import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuddyItemsPageRoutingModule } from './buddy-items-routing.module';

import { BuddyItemsPage } from './buddy-items.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuddyItemsPageRoutingModule
  ],
  declarations: [BuddyItemsPage]
})
export class BuddyItemsPageModule {}
