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
  constructor(private nativeGeocoder:NativeGeocoder,private network:Network,private alertController:AlertController,private toastCtrl:ToastController,private router:Router,private splashScreen: SplashScreen,private androidPermissions: AndroidPermissions,private geolocation: Geolocation,private locationAccuracy: LocationAccuracy,private platform:Platform,private navController:NavController) {  this.sideMenu();

    this.splashScreen.show();


    this.location = JSON.parse(localStorage.getItem('LocationAddress') || '{}');

    if(!localStorage.getItem('currentUser')){
      console.log("no");

          }
          else{

            this.router.navigate(['home-page']);
            console.log("yes");


          }
    this.geolocation.getCurrentPosition({

      timeout:10000,
      enableHighAccuracy:true
    }).then((resp) => {

      this.lat=resp.coords.latitude;
      this.lon=resp.coords.longitude;
      console.log(this.lat+'-'+this.lon);


setTimeout(() => {
  const getAddress= this.ReverseGeocoding(this.lat,this.lon);
  this.selectedLocation=getAddress;
  console.log("dsfadgdfsgsdfgfsd"+getAddress);
  var locationAddress={
    lat:this.lat,
    lon:this.lon,
    address:this.selectedLocation
  }
  if(this.location==undefined || this.location==null || this.location==""){
    localStorage.setItem("LocationAddress",JSON.stringify(locationAddress));
  }
  else{

  }

}, 2000);



     }).catch((error) => {
       console.log('Error getting location', error);
     });

     let watch = this.geolocation.watchPosition();
     watch.subscribe((data) => {


     });


    //this.splashScreen.hide();
   this.locCords = {
    latitude: "",
    longitude: "",
    accuracy: "",
    timestamp: ""



  }


  this.times = Date.now();
  this.chckAppGpsPermission();


this.network.onDisconnect().subscribe(() => {
  console.log('network was disconnected :-(');
  this.presentToast();

});


 this.network.onConnect().subscribe(() => {


});

  }




  ReverseGeocoding(lat:any,lon:any){

    //this.present();
      var options:NativeGeocoderOptions={
        useLocale:true,
        maxResults:1
      }
        this.nativeGeocoder.reverseGeocode(lat,lon,options).then((results)=>{
    this.reverseGeocodingResults=JSON.stringify(results[0]);

    this.selectedLocation=JSON.stringify(results[0].thoroughfare).replace(/"/g, "")+','+JSON.stringify(results[0].locality).replace(/"/g, "")+','+JSON.stringify(results[0].subAdministrativeArea).replace(/"/g, "")+','+JSON.stringify(results[0].administrativeArea).replace(/"/g, "")+','+JSON.stringify(results[0].countryName).replace(/"/g, "")+','+JSON.stringify(results[0].countryCode).replace(/"/g, "");


    return this.selectedLocation;
    //this.dismiss();
    })
      }



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
        this.getLocationAccCords()
      },
      error => this.presentAlertConfirm()
    );

  }

  getLocationAccCords() {
    this.geolocation.getCurrentPosition().then((response) => {
      this.locCords.latitude = response.coords.latitude;
      this.locCords.longitude = response.coords.longitude;
      this.locCords.accuracy = response.coords.accuracy;
      this.locCords.timestamp = response.timestamp;
    }).catch((err) => {
      alert('Error: ' + err);
    });
  }

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
