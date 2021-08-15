import { Component, OnInit,OnDestroy, HostListener } from '@angular/core';
import {Router} from '@angular/router';
import { LoadingController } from '@ionic/angular';
import Orders from '../models/orders';
import{OrdersService} from 'src/app/orders.service';
import { Platform } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import{CartService} from 'src/app/cart.service';
import Cart from '../models/cart';
import Tokens from '../models/tokens';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import Category from '../models/category';
import{CategoriesService} from 'src/app/categories.service';

import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';




@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
})
export class HomePagePage implements OnInit,OnDestroy {
  navigate: any;
  user: any;
  isLoading = false;
  userType: any;
  orderDetails: Orders[]=[];
  subscribe: any;
  currentUrl:any;
  cartItemsAll:Cart[]=[];
  orderStatus:String;
  tokens:Tokens[]=[];
  lat;
  lon;
  selectedLocation:any;
  reverseGeocodingResults:any;
  location;
  locCords: any;
  constructor(private categoriesService:CategoriesService,private nativeGeocoder:NativeGeocoder,private geolocation: Geolocation,private locationAccuracy: LocationAccuracy,private cartService:CartService,private router: Router,public loadingController: LoadingController,private ordersService: OrdersService,private platform: Platform,private navController:NavController) {
    this.location = JSON.parse(localStorage.getItem('LocationAddress') || '{}');
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
  if(this.location[0]==undefined || this.location[0]==null || this.location[0]==""){
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

  }




  slidesOptions={

  };

  RestaurantPage(type:String){
    console.log(type);
    this.router.navigate(['home/'+type]);
  }
  Dashboard(){
    console.log('user Type '+this.userType);
    if(this.userType=='R'){
      this.router.navigate(['restaurant-owner-dashboard']);
    }
    else if(this.userType=='D'){
      this.router.navigate(['delivery-partner-dashboard']);
    }
    else if(this.userType=='A'){
      this.router.navigate(['admin-dashboard']);
    }
    else{
      console.log('this is '+this.userType);
    }
  }
token:String;
  ngOnInit() {

    // -------------------------------------------------------------------------------Push notificaion start--------------------------
    console.log('Initializing HomePage');

    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration',
      (token: Token) => {
        //alert('Push registration success, token: ' + token.value);
        console.log("token value   "+token.value);
        var data={
          Token:token.value
        }

        this.ordersService.GetTokens(data).subscribe((res)=>{
          this.tokens=res as Tokens[];
          console.log("get tokes  "+this.tokens.length);


         if(this.tokens.length){
          console.log("token already registered");

        }else{
         console.log("token not saved yet");
    this.ordersService.SaveTokens(data).subscribe((res)=>{
     console.log("token saved successful");
    })
        }




             });

      }
    );

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
      (error: any) => {
       // alert('Error on registration: ' + JSON.stringify(error));
      }
    );

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotificationSchema) => {
      //  alert('Push received: ' + JSON.stringify(notification));
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
       // alert('Push action performed: ' + JSON.stringify(notification));
      }
    );



// -------------------------------------------------------------------------------Push notificaion end--------------------------

   this.currentUrl=this.router.url;

    console.log("current url "+this.currentUrl);
    this.subscribe=this.platform.backButton.subscribeWithPriority(666666,()=>{

 if(this.currentUrl==="/home-page"){
  if(window.confirm("do you want to exit app?")){
    navigator["app"].exitApp();
  }

 }
 else{
   this.navController.back();
 }

 })

    this.user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.userType=this.user[0].UserType;
    this.sideMenu();
    console.log('home page etered');
    const getOrders={
      Status:'Placed',
      ActiveYn:true,
      UserId:this.user[0]._id
    };

    this.ordersService.GetPlacedOrders(getOrders).subscribe((res)=>{
      this.orderDetails=res as Orders[];
     // console.log(this.orderDetails);





         });


  }

  sideMenu()
  {
    this.navigate=
    [
      {
        title : 'Cart',
        url   : '/home',
        icon  : 'cart'
      },
      {
        title : 'Orders',
        url   : '/home',
        icon  : 'list'
      },
      {
        title : 'Favourites',
        url   : '/chat',
        icon  : 'heart'
      },
      {
        title : 'Help Us To Improve',
        url   : '/contacts',
        icon  : 'trending-up'
      },
      {
        title : 'About Us',
        url   : '/contacts',
        icon  : 'paw'
      },
      {
        title : 'Terms And Conditions',
        url   : '/contacts',
        icon  : 'information-circle'
      },
      {
        title : 'Sign Out',
        url   : '/contacts',
        icon  : 'log-out',

      },
    ];
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  async present() {
    this.isLoading = true;
    return await this.loadingController.create({
      // duration: 5000,
      cssClass: 'my-custom-class',
          message: 'Please wait...',
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }

  LogOut(){
    // console.log("hi logout");
   // window.cache.clear();
    localStorage.removeItem('currentUser');
    this.router.navigate(['login']);
   }

   ionViewWillEnter(){
   this.ngOnInit();

  //this.list.length=0;


  }
  onDestroy(){
    console.log("page destroyed");
  }
  @HostListener('unloaded')
  ngOnDestroy(){
    console.log("Home angular page destroyed");
  }
  ionViewWillLeave() {
this.currentUrl="";
  }

  OrdersPage(){
    this.router.navigate(['orders']);
  }

  ViewCart(){
    this.router.navigate(['cart']);
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
}
