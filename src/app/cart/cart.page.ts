
import { Component, OnInit } from '@angular/core';
//import { Geolocation } from '@ionic-native/geolocation/ngx';
//import { Geolocation } from '@capacitor/geolocation';
import { Geolocation } from '@ionic-native/geolocation/ngx';
//import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {



  reverseGeocodingResults:string="";
  lat:any;
  lon:any;
  address:string="";
  default:string="";
  constructor(private geolocation: Geolocation,private nativeGeocoder:NativeGeocoder,public actionSheetController: ActionSheetController) {

this.default="Delivery";


  }

  whereIam(){
    this.geolocation.getCurrentPosition({

      timeout:10000,
      enableHighAccuracy:true
    }).then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.lat=resp.coords.latitude;
      this.lon=resp.coords.longitude;



      console.log(resp.coords.latitude);
      console.log(resp.coords.longitude);

      this.ReverseGeocoding(this.lat,this.lon);
     }).catch((error) => {
       console.log('Error getting location', error);
     });

     let watch = this.geolocation.watchPosition();
     watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude

     });




  }



  ngOnInit() {
  }
  segmentChanged(event:any){
console.log(event.target.value);
this.default=event.target.value;
  }



  ReverseGeocoding(lat:any,lon:any){


  var options:NativeGeocoderOptions={
    useLocale:true,
    maxResults:1
  }
    this.nativeGeocoder.reverseGeocode(lat,lon,options).then((results)=>{
this.reverseGeocodingResults=JSON.stringify(results[0]);
    })
  }



}
