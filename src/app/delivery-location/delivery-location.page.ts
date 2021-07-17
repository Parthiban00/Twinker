import { AfterViewInit, Component, OnInit, ViewChild ,ElementRef} from '@angular/core';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
declare var google;
@Component({
  selector: 'app-delivery-location',
  templateUrl: './delivery-location.page.html',
  styleUrls: ['./delivery-location.page.scss'],
})
export class DeliveryLocationPage implements AfterViewInit {
map;
@ViewChild('mapElement',{static:false,read:ElementRef}) mapElement:ElementRef;

mapOptions={
  cneter:{lat:-34.397, lng:150.644},
  zoom:8,
}

lat:any;
  lon:any;
  constructor(private geolocation: Geolocation,private nativeGeocoder:NativeGeocoder) {

    this.geolocation.getCurrentPosition({



      timeout:10000,
      enableHighAccuracy:true
    }).then((resp) => {

      this.lat=resp.coords.latitude;
      this.lon=resp.coords.longitude;
  console.log(this.lat);
  this.loadMap();
  this.mapOptions.cneter.lat=resp.coords.latitude;
  this.mapOptions.cneter.lng=resp.coords.longitude;

     }).catch((error) => {
       console.log('Error getting location', error);
     });
   }
  ngAfterViewInit(): void {

  }



loadMap(){


const location=new google.maps.LatLng(this.lat, this.lon);
const options={
  center:location,
  zoom:15,
  deisableDefaultUI:true
}
this. map=new google.maps.Map(this.mapElement.nativeElement, options);
const marker = new google.maps.Marker({
  position:this.mapOptions.cneter,
  map:this.map,
  title:'Current Location'
})
const geocoder = new google.maps.Geocoder();
const infowindow = new google.maps.InfoWindow();

  }




}


