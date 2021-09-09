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
import { ThrowStmt } from '@angular/compiler';


import { ModalController } from '@ionic/angular';

import {ChangeLocationPage} from '../change-location/change-location.page';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
})
export class HomePagePage implements  OnInit {
  navigate: any;
   user:any;
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

  constructor(public modalController: ModalController,private categoriesService:CategoriesService,private nativeGeocoder:NativeGeocoder,private geolocation: Geolocation,private locationAccuracy: LocationAccuracy,private cartService:CartService,private router: Router,public loadingController: LoadingController,private ordersService: OrdersService,private platform: Platform,private navController:NavController) {





  }
  ngOnInit(): void {

    this.location = JSON.parse(localStorage.getItem('LocationAddress') || '{}');
    console.log('location'+this.location.address)
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
     console.log('1');
    this.user = JSON.parse(localStorage.getItem('currentUser') || '{}');;



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


console.log('2');
console.log('this user '+this.user._id);


 this.userType=this.user[0].UserType;
 console.log(this.userType);
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


  ChangeLocation(){
    this.modalController.create({
      component:ChangeLocationPage,
      componentProps:this.location
              }).then(modalres=>{
                modalres.present();

                modalres.onDidDismiss().then(res=>{
                  if(res.data!=null){
                    localStorage.removeItem('LocationAddress');
console.log('changed address '+res.data.address);
this.selectedLocation=res.data.address;

localStorage.setItem('LocationAddress',JSON.stringify(res.data));
this.location = JSON.parse(localStorage.getItem('LocationAddress') || '{}');
//this.ionViewWillEnter();
                  }
                  else{
                    console.log('resposnse null');
                  }
                })
              })

  }

}
