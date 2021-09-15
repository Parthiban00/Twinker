import { AfterViewInit, Component, OnInit, ViewChild ,ElementRef} from '@angular/core';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ActivatedRoute,Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';




declare var google;

@Component({
  selector: 'app-delivery-location',
  templateUrl: './delivery-location.page.html',
  styleUrls: ['./delivery-location.page.scss'],
})
export class DeliveryLocationPage implements AfterViewInit {  public folder: string;
  //public map;
 // map:L.Map;
 public geocoder;
 marker;
 latitude;
 longitude;
 zoom: number;
 address: string;
 lat;
 lng;
 locationAddress;
 autocomplete;


formattedAddress;
  @ViewChild('mapElement', {static: false}) mapElement;

map:any;
  constructor(private activatedRoute: ActivatedRoute,private router:Router,private geolocation:Geolocation,private nativeGeocoder:NativeGeocoder) { }

  ngOnInit() {

  }

  ngAfterViewInit(): void {


this.initMap(9.8485381,78.4874151);

//this.setCurrentLocation()

  }
initMap(lat:any,lng:any){
  let coords=new google.maps.LatLng(lat,lng);
  this.geocoder = new google.maps.Geocoder();
  let mapOption: google.maps.MapOptions={
    center:coords,
    zoom:16,

  }

  this.getAddress(lat,lng);

   this.map=new google.maps.Map(this.mapElement.nativeElement,mapOption)

   var infowindow = new google.maps.InfoWindow({
    content: "<span>you are here</span>"
 });

   this.marker = new google.maps.Marker({
    position: coords,
     map: this.map,
     title: "Drag me!",
    draggable: true,

   });

  google.maps.event.addListener(this.marker, 'click', function() {
      infowindow.open(this.map,this.marker);
    });
    //this.geocodePosition(this.marker.getPosition());
    google.maps.event.addListener(this.marker, 'dragend', () => {
    this.geocodePosition(this.marker.getPosition());
      });
}




setCurrentLocation() {
  console.log("setCurrentLoaction entered");

      navigator.geolocation.getCurrentPosition((position) => {
           this.latitude = position.coords.latitude;
              this.longitude = position.coords.longitude;
             // let coords=new google.maps.LatLng(this.latitude,this.longitude);
 console.log("lat lng "+this.latitude+' '+this.longitude);
         this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);

      this.initMap(this.latitude,this.longitude);
      });
// this.geolocation.getCurrentPosition().then((resp) => {
// // resp.coords.latitude
// // resp.coords.longitude
// this.getAddress(resp.coords.latitude, resp.coords.longitude);

// }).catch((error) => {
// console.log('Error getting location', error);
// });

}



getAddress(latitude, longitude) {
  console.log('getAddress entered');
  this.geocoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
    if (status === 'OK') {
      if (results[0]) {
        this.zoom = 12;
        this.address = results[0].formatted_address;
        this.formattedAddress=this.address;
        console.log("getAddress "+this.address);
         this.locationAddress={
          lat:latitude,
          lon:longitude,
          address:this.address
        }
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }

  });
}


geocodePosition(pos) {
  console.log(pos);
  this.geocoder.geocode({
    latLng: pos
  }, (responses) => {
    if (responses && responses.length > 0) {
      this.formattedAddress = responses[0].formatted_address;
      this.latitude=this.marker.getPosition().lat();
      this.longitude=this.marker.getPosition().lng();
      console.log("lat lng: "+this.latitude+' '+this.longitude);
      this.locationAddress={
        lat:this.latitude,
        lon:this.longitude,
        address:this.formattedAddress
      }
    } else {
    }
  });
}






  setCurrentPosition(){}






  ApplyDeliveryDetails(){

    localStorage.setItem("LocationAddress",JSON.stringify(this.locationAddress));
    this.router.navigate(['home-page']);
  }



}


