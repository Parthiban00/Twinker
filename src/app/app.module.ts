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


import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,FormsModule],
  providers: [NativeGeocoder,Geolocation,HttpClientModule,HttpClient,FormsModule,


    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },HTTP],
  bootstrap: [AppComponent],
})
export class AppModule {}
