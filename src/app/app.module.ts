import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule } from '@angular/forms';
import{HTTP} from '@ionic-native/http/ngx';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {DatePicker} from '@ionic-native/date-picker/ngx';
//import { CacheModule } from "ionic-cache";
import {MatFormFieldModule} from '@angular/material/form-field';
import { Network } from '@ionic-native/network/ngx';
import { MatMomentDateModule, MomentDateAdapter } from "@angular/material-moment-adapter";


import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
//import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';

//import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrdersAdminPipe } from './orders-admin.pipe';
@NgModule({
  declarations: [AppComponent, OrdersAdminPipe],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,FormsModule, BrowserAnimationsModule,MatExpansionModule,MatGridListModule],
  providers: [NativeGeocoder,Geolocation,HttpClientModule,HttpClient,FormsModule,ToastController,SplashScreen, AndroidPermissions,LocationAccuracy,MatDatepickerModule,Network,
    DatePicker,MatFormFieldModule,MatMomentDateModule,MomentDateAdapter,

    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },HTTP],
  bootstrap: [AppComponent],
  // schemas: [
  //   CUSTOM_ELEMENTS_SCHEMA
  // ],
})
export class AppModule {}
