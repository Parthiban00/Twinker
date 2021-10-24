import { AfterViewInit, Component, OnInit, ViewChild ,ElementRef,NgZone} from '@angular/core';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ActivatedRoute,Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import { AlertController } from '@ionic/angular';



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
 //autocomplete;


formattedAddress;

autocomplete: { input: string; };
autocompleteItems: any[];
GoogleAutocomplete: any;
coords;
placeid: any;
  @ViewChild('mapElement', {static: false}) mapElement;

map:any;
  constructor(private alertController:AlertController,private zone:NgZone,private activatedRoute: ActivatedRoute,private router:Router,private geolocation:Geolocation,private nativeGeocoder:NativeGeocoder) {

    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
this.autocomplete = { input: '' };
this.autocompleteItems = [];
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {


//this.initMap(9.8485381,78.4874151);
this.loadMap();

//this.setCurrentLocation()

  }
initMap(lat:any,lng:any){


  navigator.geolocation.getCurrentPosition((position) => {
    this.latitude = position.coords.latitude;
       this.longitude = position.coords.longitude;
      // let coords=new google.maps.LatLng(this.latitude,this.longitude);
console.log("lat lng "+this.latitude+' '+this.longitude);
  this.zoom = 8;
 this.getAddress(this.latitude, this.longitude);


});


  let coords=new google.maps.LatLng(this.latitude,this.longitude);
  this.geocoder = new google.maps.Geocoder();
  let mapOption: google.maps.MapOptions={
    center:coords,
    zoom:15,

  }

  //this.getAddress(lat,lng);

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


loadMap() {

  //FIRST GET THE LOCATION FROM THE DEVICE.
  this.geolocation.getCurrentPosition().then((resp) => {
    let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    //LOAD THE MAP WITH THE PREVIOUS VALUES AS PARAMETERS.
   // this.getAddress(resp.coords.latitude, resp.coords.longitude);
   this.geocoder = new google.maps.Geocoder();
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.map.addListener('tilesloaded', () => {
      console.log('accuracy',this.map, this.map.center.lat());

      this.lat = this.map.center.lat()
      this.lng = this.map.center.lng()
      this.getAddress(this.map.center.lat(), this.map.center.lng())
    });
  }).catch((error) => {
    console.log('Error getting location', error);
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


      this.initMap(this.latitude,this.longitude);
      this.getAddress(this.latitude, this.longitude);
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

    if(this.formattedAddress=="" || this.formattedAddress==undefined || this.formattedAddress==null){
this.presentAlertConfirm();
    }
    else{

    localStorage.setItem("LocationAddress",JSON.stringify(this.locationAddress));
    this.router.navigate(['home-page']);
  }
  }

  ShowCords(){
    alert('lat' +this.lat+', long'+this.lng )

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
      //  alert(JSON.stringify(item))
        this.placeid = item.place_id
        this.GetCoordFromPlaceId();
        this.autocompleteItems = [];
        this.autocomplete.input = ''
      }

      ClearAutocomplete(){
        this.autocompleteItems = []
        this.autocomplete.input = ''
      }

      // GoTo(){
      //   return window.location.href = 'https://www.google.com/maps/search/?api=1&query=Google&query_place_id='+this.placeid;
      // }

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


      async presentAlertConfirm() {

        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
         // header: 'Successfull',
          message: 'Set Your Location Please...',
          buttons: [
           {
              text: 'Set Current Location',
              handler: () => {
                console.log('Confirm Okay');
    this.getAddress(this.lat,this.lng);
                //this.router.navigate(['home-page']);

              }
            }
          ]
        });

        await alert.present();
      }

}


