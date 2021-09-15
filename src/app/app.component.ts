
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Platform } from '@ionic/angular';
import { NavController,ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
declare var google;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  navigate : any;
  locCords: any;
  times: any;
  subscribe: any;
  lat;
  lon;
  selectedLocation:any;
  reverseGeocodingResults:any;
  location;
  latitude;
  longitude;
  address;
  public geocoder;
  constructor(private nativeGeocoder:NativeGeocoder,private network:Network,private alertController:AlertController,private toastCtrl:ToastController,private router:Router,private splashScreen: SplashScreen,private androidPermissions: AndroidPermissions,private geolocation: Geolocation,private locationAccuracy: LocationAccuracy,private platform:Platform,private navController:NavController) {  this.sideMenu();

    this.splashScreen.show();

    //localStorage.removeItem('LocationAddress');
  //  this.geocoder = new google.maps.Geocoder();

    if(!localStorage.getItem('currentUser')){
      console.log("no");

          }
          if(localStorage.getItem('currentUser') && !localStorage.getItem('LocationAddress')){
            console.log('lcoation no');
            this.router.navigate(['delivery-location'])
          }
          else{

            this.router.navigate(['home-page']);
            console.log("yes");


          }





  this.times = Date.now();
  this.chckAppGpsPermission();


this.network.onDisconnect().subscribe(() => {
  console.log('network was disconnected :-(');
  this.presentToast();

});


 this.network.onConnect().subscribe(() => {


});



//this.setCurrentLocation();
  }

//   setCurrentLocation() {

//     console.log("setCurrentLoaction entered");
//     this.geocoder = new google.maps.Geocoder();
//      navigator.geolocation.getCurrentPosition((position) => {
//        this.latitude = position.coords.latitude;
//        this.longitude = position.coords.longitude;

// console.log("lat lng "+this.latitude+' '+this.longitude);

//        this.getAddress(this.latitude, this.longitude);
//      });

//  }
//  getAddress(latitude, longitude) {
//   console.log('getAddress entered');
//   this.geocoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
//     if (status === 'OK') {
//       if (results[0]) {

//         this.address = results[0].formatted_address;
//         console.log("getAddress "+this.address);
//         var locationAddress={
//           lat:latitude,
//           lon:longitude,
//           address:this.address
//         }
//         localStorage.setItem("LocationAddress",JSON.stringify(locationAddress));
//       } else {

//       }
//     } else {

//     }

//   });
// }


  // ReverseGeocoding(lat:any,lon:any){


  //     var options:NativeGeocoderOptions={
  //       useLocale:true,
  //       maxResults:1
  //     }
  //       this.nativeGeocoder.reverseGeocode(lat,lon,options).then((results)=>{
  //   this.reverseGeocodingResults=JSON.stringify(results[0]);

  //   this.selectedLocation=JSON.stringify(results[0].thoroughfare).replace(/"/g, "")+','+JSON.stringify(results[0].locality).replace(/"/g, "")+','+JSON.stringify(results[0].subAdministrativeArea).replace(/"/g, "")+','+JSON.stringify(results[0].administrativeArea).replace(/"/g, "")+','+JSON.stringify(results[0].countryName).replace(/"/g, "")+','+JSON.stringify(results[0].countryCode).replace(/"/g, "");


  //   return this.selectedLocation;

  //   })
  //     }



  chckAppGpsPermission() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
      result => {
        if (result.hasPermission) {
          this.requestToSwitchOnGPS();
        } else {
          this.askGPSPermission();
        }
      },
      err => {
      //  alert(err);
      }
    );
  }

  askGPSPermission() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
      } else {
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
          .then(
            () => {
              this.requestToSwitchOnGPS();
            },
            error => {
             // alert(error)
            }
          );
      }
    });
  }


  requestToSwitchOnGPS() {
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      () => {

      },
      error => this.presentAlertConfirm()
    );

  }

  // getLocationAccCords() {
  //   this.geolocation.getCurrentPosition().then((response) => {
  //     this.locCords.latitude = response.coords.latitude;
  //     this.locCords.longitude = response.coords.longitude;
  //     this.locCords.accuracy = response.coords.accuracy;
  //     this.locCords.timestamp = response.timestamp;

  //     setTimeout(() => {
  //       const getAddress= this.ReverseGeocoding(this.locCords.latitude,this.locCords.longitude);
  //       this.selectedLocation=getAddress;
  //       console.log("dsfadgdfsgsdfgfsd swithc on gps    "+getAddress);
  //       var locationAddress={
  //         lat:this.locCords.latitude,
  //         lon:this.locCords.longitude,
  //         address:this.selectedLocation
  //       }
  //       if(this.location[0].lat==undefined || this.location[0].lat==null || this.location[0].lat==""){
  //         localStorage.setItem("LocationAddress",JSON.stringify(locationAddress));
  //       }
  //       else{

  //       }

  //     }, 2000);




  //   }).catch((err) => {
  //     alert('Error: ' + err);
  //   });
  // }

  sideMenu()
  {
    this.navigate=
    [
      {
        title : "Cart",
        url   : "/cart",
        icon  : "cart"
      },
      {
        title : "Orders",
        url   : "/orders",
        icon  : "list"
      },
      {
        title : "Favourites",
        url   : "/favourites",
        icon  : "heart"
      },
      {
        title : "Help Us To Improve",
        url   : "/to-improve",
        icon  : "trending-up"
      },
      {
        title : "About Us",
        url   : "/about-us",
        icon  : "paw"
      },
      {
        title : "Terms And Conditions",
        url   : "/terms-conditions",
        icon  : "information-circle"
      },
      {
        title : "Sign Out",
       url   : "/login",
        icon  : "log-out",
       // function:LogOut()


      },
    ]
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

   LogOut(){
    // console.log("hi logout");
   // window.cache.clear();
    localStorage.removeItem('currentUser');
   // localStorage.removeItem('LocationAddress');
    this.router.navigate(['login']);
   }

   async presentToast(){
    const toast=await this.toastCtrl.create({
      message:'Your are disconnected...',

      duration:5000,
      position:"middle",
    });
    toast.present();
  }

  async presentAlertConfirm() {

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Sorry!',
      message: 'Ooo Nooo! You cannot place orders without turn on location. Kindly Turn On Locaiton (GPS).',
      buttons: [

       {

          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');

           this.requestToSwitchOnGPS();

          }



        }


      ]
    });

    await alert.present();
  }

  async presentAlertConfirm1() {

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Ooops!',
      message: 'You are Disconnected. Kinldy turn on Internet on your Device to Continue.',
      buttons: [

       {

          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');

          // this.requestToSwitchOnGPS();

          }



        }


      ]
    });

    await alert.present();
  }









}
