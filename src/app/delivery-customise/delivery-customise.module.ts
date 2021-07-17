import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import { IonicModule } from '@ionic/angular';
import {MatButtonModule} from '@angular/material/button';
import { DeliveryCustomisePageRoutingModule } from './delivery-customise-routing.module';
import { MatTimepickerModule } from 'mat-timepicker';
import { DeliveryCustomisePage } from './delivery-customise.page';
import {MatIconModule} from '@angular/material/icon';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeliveryCustomisePageRoutingModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    MatTimepickerModule,
    MatIconModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule

  ],
  declarations: [DeliveryCustomisePage]
})
export class DeliveryCustomisePageModule {}
