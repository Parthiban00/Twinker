import { AfterViewInit, Component, OnInit, ViewChild ,ElementRef,NgZone} from '@angular/core';
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


autocomplete: { input: string; };
autocompleteItems: any[];
GoogleAutocomplete: any;
placeid: any;
  @ViewChild('mapElement', {static: false}) mapElement;
  public formattedAddress;

  constructor(private zone:NgZone,private activatedRoute: ActivatedRoute,public modalController: ModalController,private navParams:NavParams,private geolocation: Geolocation) {
this.presentAddress=this.navParams.data;
console.log('present address '+this.presentAddress.address);

this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
this.autocomplete = { input: '' };
this.autocompleteItems = [];
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
    this.map.addListener('tilesloaded', () => {
      console.log('accuracy',this.map, this.map.center.lat());

      this.lat = this.map.center.lat()
      this.lng = this.map.center.lng()
      this.getAddress(this.map.center.lat(), this.map.center.lng())
    });
    // this.geocodePosition(this.marker.getPosition());
    // google.maps.event.addListener(this.marker, 'dragend', () => {
    //   this.geocodePosition(this.marker.getPosition());
    // });
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

    this.InitMap(this.latitude,this.longitude);
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
          //this.address = results[0].formatted_address;

          console.log("getAddress "+this.address);
           this.changedAddress={
             lat:latitude,
             lon:longitude,
            address:this.address
         }
          this.presentAddress={
            lat:latitude,
            lon:longitude,
            address:results[0].formatted_address,
          }
          this.formattedAddress = results[0].formatted_address;

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


  GetCoordFromPlaceId(){
    this.geocoder.geocode({ placeId: this.placeid })
    .then(({ results }) => {
      // this.map.setZoom(11);
       this.map.setCenter(results[0].geometry.location);
      console.log(results[0].geometry.location);

      // Set the position of the marker using the place ID and location.
      // @ts-ignore TODO(jpoehnelt) This should be in @typings/googlemaps.
      // marker.setPlace({
      //   placeId: this.placeid,
      //   location: results[0].geometry.location,
      // });


    })
    .catch((e) => window.alert("Geocoder failed due to: " + e));

  }

  ApplyDeliveryDetails(){

    //localStorage.setItem("LocationAddress",JSON.stringify(this.changedAddress));
    this.modalController.dismiss(this.presentAddress);
      }
      CancelModel(){
        this.modalController.dismiss();
      }

      // ----------------------------------------auto complete section---------------------
      UpdateSearchResults(){
        if (this.autocomplete.input == '') {
          this.autocompleteItems = [];
          return;
        }
        this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
        (predictions, status) => {
          this.autocompleteItems = [];
          this.zone.run(() => {
            predictions.forEach((prediction) => {
              this.autocompleteItems.push(prediction);
            });
          });
        });
      }

      SelectSearchResult(item) {
        ///WE CAN CONFIGURE MORE COMPLEX FUNCTIONS SUCH AS UPLOAD DATA TO FIRESTORE OR LINK IT TO SOMETHING
       // alert(JSON.stringify(item))
        this.placeid = item.place_id
        this.GetCoordFromPlaceId();
        this.autocompleteItems = [];
        this.autocomplete.input = ''
      }

      ClearAutocomplete(){
        this.autocompleteItems = []
        this.autocomplete.input = ''
      }
}
