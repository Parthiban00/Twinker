import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OtpVerificationPageRoutingModule } from './otp-verification-routing.module';

import { OtpVerificationPage } from './otp-verification.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OtpVerificationPageRoutingModule
  ],
  declarations: [OtpVerificationPage]
})
export class OtpVerificationPageModule {}
