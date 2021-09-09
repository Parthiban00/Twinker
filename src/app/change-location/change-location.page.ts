import { AfterViewInit, Component, OnInit, ViewChild ,ElementRef} from '@angular/core';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';

declare var google;
@Component({
  selector: 'app-change-location',
  templateUrl: './change-location.page.html',
  styleUrls: ['./change-location.page.scss'],
})
export class ChangeLocationPage implements AfterViewInit {  public folder: string;
  public map;

  public geocoder;
  marker;
  latitude;
  longitude;
  zoom: number;
  address: string;
  lat;
  lng;
presentAddress;
changedAddress;
  @ViewChild('mapElement', {static: false}) mapElement;
  public formattedAddress;

  constructor(private activatedRoute: ActivatedRoute,public modalController: ModalController,private navParams:NavParams,private geolocation: Geolocation) {
this.presentAddress=this.navParams.data;
console.log('present address '+this.presentAddress.address);
   }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngAfterViewInit(): void {


//this.setCurrentLocation();
this.InitMap(this.presentAddress.lat,this.presentAddress.lon);


  }

  InitMap(lat,lng){

    const myLatlng = new google.maps.LatLng(lat, lng);
    this.geocoder = new google.maps.Geocoder();
    const mapOptions = {
      zoom: 17,
      center: myLatlng
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.marker = new google.maps.Marker({
      position: myLatlng,
      map: this.map,
      draggable: true,
      title: 'Drag me!'
    });
    this.geocodePosition(this.marker.getPosition());
    google.maps.event.addListener(this.marker, 'dragend', () => {
      this.geocodePosition(this.marker.getPosition());
    });
  }

  setCurrentLocation() {
    console.log("setCurrentLoaction entered");

//       navigator.geolocation.getCurrentPosition((position) => {
//         this.latitude = position.coords.latitude;
//         this.longitude = position.coords.longitude;
//         this.InitMap(this.latitude,this.longitude);
// console.log("lat lng "+this.latitude+' '+this.longitude);
//         this.zoom = 8;
//         this.getAddress(this.latitude, this.longitude);
//       });
this.geolocation.getCurrentPosition().then((resp) => {
 // resp.coords.latitude
 // resp.coords.longitude
 this.getAddress(resp.coords.latitude, resp.coords.longitude);
}).catch((error) => {
  console.log('Error getting location', error);
});

 }
  getAddress(latitude, longitude) {
    console.log('getAddress entered');
    this.geocoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
          console.log("getAddress "+this.address);
          this.changedAddress={
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
        this.presentAddress={
          lat:this.latitude,
          address:this.formattedAddress,
          lon:this.longitude
        }
      } else {
      }
    });
  }



  ApplyDeliveryDetails(){

    //localStorage.setItem("LocationAddress",JSON.stringify(this.changedAddress));
    this.modalController.dismiss(this.presentAddress);
      }
      CancelModel(){
        this.modalController.dismiss();
      }

}
