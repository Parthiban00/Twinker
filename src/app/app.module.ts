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
//import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,FormsModule, BrowserAnimationsModule,MatExpansionModule,MatGridListModule],
  providers: [NativeGeocoder,Geolocation,HttpClientModule,HttpClient,FormsModule,ToastController,


    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },HTTP],
  bootstrap: [AppComponent],
  // schemas: [
  //   CUSTOM_ELEMENTS_SCHEMA
  // ],
})
export class AppModule {}
