import { Component, OnInit,OnDestroy, HostListener } from '@angular/core';
import {Router} from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
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
import MainCategory from '../models/main-categories';
import AddSlide from '../models/add-slide';
import BuddySlide from '../models/buddy-slide';
import BookingSlide from '../models/booking-slide';
import {DashboardService} from '../dashboard.service';
import {OffersPage} from '../offers/offers.page';
import  {SocketService} from '../socket.service';
import { ModalController } from '@ionic/angular';
import {CallNumber} from "@ionic-native/call-number/ngx";
import {ChangeLocationPage} from '../change-location/change-location.page';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';





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
  countdown;
  locCords: any;
  mainCategory:MainCategory[];
addSlide:AddSlide[];
buddySlide:BuddySlide[];
bookingSlide:BookingSlide[];
itemTotal=0;
orderDetailsFromSocket=[];
skeleton=[

  {},
  {},
  {},
  {},
  {},
  {}
  ]
  addskeleton=[

    {},
    {},
    {},
    {},
    {},
    {}
    ]
    buddyskeleton=[

      {},
      {},
      {},
      {},
      {},
      {}
      ]
  constructor(private call:CallNumber,private plt:Platform,private localNotifications:LocalNotifications,private alertCtrl:AlertController,private socketService:SocketService ,private dashboardService:DashboardService,public modalController: ModalController,private categoriesService:CategoriesService,private nativeGeocoder:NativeGeocoder,private geolocation: Geolocation,private locationAccuracy: LocationAccuracy,private cartService:CartService,private router: Router,public loadingController: LoadingController,private ordersService: OrdersService,private platform: Platform,private navController:NavController) {

this.plt.ready().then(()=>{
  this.localNotifications.on('click').subscribe(res=>{

  });
  this.localNotifications.on('trigger').subscribe(res=>{

  });
  this.repeatingDaily();
});



  }
  ngOnInit(): void {



    this.location = JSON.parse(localStorage.getItem('LocationAddress') || '{}');
    console.log('location'+this.location.address)



    // this.dashboardService.GetBookingSlide().subscribe((res)=>{
    //   this.bookingSlide=res as BookingSlide[];
    // })
  }

scheduleNotifications(){

}
recurringNotifications(){

}
repeatingDaily(){
this.localNotifications.schedule({
  id:42,
  title:'What would you like to eat...',
  text:'Lets find your favorite menus from your favorite sopts...Tap to Order now...',
  trigger:{every:{hour:1,minute:50}}
});
}
getAll(){

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
    // this.router.navigate(['setup-location']);
    }
    else if(this.userType=='A'){
      this.router.navigate(['admin-dashboard']);
     //var restaurantName='Hotel Vallavan';
     //var restaurantId="60d54c87a206741f10a4b716";
    // var type='Food';
  // this.router.navigate(['products/'+restaurantName+'/'+restaurantId+'/'+type]);
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
    this.user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    //this.location=JSON.parse(localStorage.getItem('LocationAddress') || '{}');
    var data={
      room:this.location.locality,
      user:'user'
    }
this.socketService.JoinRoom(data);
    var getCart={
      UserId:this.user[0]._id,
      Status:"Cart",
      ActiveYn:true,
      DeleteYn:false
    }
    this.cartService.GetCartAll(getCart).subscribe((res)=>{
      this.cartItemsAll=res as Cart[];
      console.log(this.cartItemsAll);

      for(var i=0;i<this.cartItemsAll.length;i++){
       this.itemTotal+=this.cartItemsAll[i].Amount;
       // this.restaurantName=this.cartItemsAll[i].RestaurantName;
        }

    })

    this.dashboardService.GetMainCategory().subscribe((res)=>{
      this.mainCategory=res as MainCategory[];
      console.log(this.mainCategory);
    })

    this.dashboardService.GetAddSlide().subscribe((res)=>{
      this.addSlide=res as AddSlide[];
    })
    this.dashboardService.GetBuddySlide().subscribe((res)=>{
      this.buddySlide=res as BuddySlide[];
    })
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
  console.log(this.orderDetails[0].DeliveryPartnerDetails.ImageUrl);
 this.orderDetailsFromSocket[0]=this.orderDetails;

console.log(this.orderDetails[0].DeliveryTime);



     });


     this.socketService.GetEmitedAcceptedOrders().subscribe((data)=>{

      this.orderDetailsFromSocket=[];
      console.log("hi this sockert"+data);
      //this.orderDetailsFromSocket1.push(data.data);
      this.orderDetailsFromSocket.push(data.data);
      console.log("orderDetailsFromSocket -----------"+JSON.stringify(this.orderDetailsFromSocket));

      console.log("orderDetailsFromSocket1111111111111 -----------"+this.orderDetailsFromSocket[0].length);

      //this.createAlert();

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
this.ionViewWillEnter();
                  }
                  else{
                    console.log('resposnse null');
                  }
                })
              })

  }
  hide(){
    console.log("hi hide");
    this.orderDetails.length=0;
    var element = document.getElementById('footer');
    element.classList.add('slide-out-bottom');
    //element.classList.remove('container');


  }
  OpenOffers(){
    this.modalController.create({
      component:OffersPage,
      //componentProps:this.location
              }).then(modalres=>{
                modalres.present();

                modalres.onDidDismiss().then(res=>{

                })
              })
  }
  GoToBuddy(){
    // console.log("go to buddy");
    // this.router.navigate(['buddy']);
  //this.router.navigate(['products']);
  }
  CalltoDeliveryBoy(mobileNo:any){
    this.call.callNumber(mobileNo,true)  .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }

}


