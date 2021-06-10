import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  navigate : any;
  locCords: any;
  times: any;
  constructor(private router:Router,private splashScreen: SplashScreen,private androidPermissions: AndroidPermissions,private geolocation: Geolocation,private locationAccuracy: LocationAccuracy) {  this.sideMenu();
    this.splashScreen.show();
   // this.splashScreen.hide();
   this.locCords = {
    latitude: "",
    longitude: "",
    accuracy: "",
    timestamp: ""
  }
  this.times = Date.now();
  this.chckAppGpsPermission();
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
        alert(err);
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
              alert(error)
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
      error => alert(JSON.stringify(error))
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
    localStorage.removeItem('currentUser');
    this.router.navigate(['login']);
   }


}
