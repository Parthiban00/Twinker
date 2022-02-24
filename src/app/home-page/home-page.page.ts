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
import {LocalNotifications,NotificationChannel} from '@capacitor/local-notifications'
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import Category from '../models/category';
import{CategoriesService} from 'src/app/categories.service';

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
import {OrderTrackModalPage} from '../order-track-modal/order-track-modal.page';
import {LocalNotificationService} from '../local-notification.service';
import BuddyBanner from '../models/buddy-banner';

import SpecialOffers from '../models/special-offers';

const channel: NotificationChannel={
  id:'audio_channel',
  name:'audio_channel',
  sound: 'notification.wav',
  importance:5,
  visibility: 1
}

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
  showApp=true;
  lon;
  selectedLocation:any;
  reverseGeocodingResults:any;
  location;
  countdown;
  locCords: any;
  mainCategory:MainCategory[];
addSlide:AddSlide[]=[];
buddySlide:BuddySlide[];
bookingSlide:BookingSlide[];
itemTotal=0;
orderDetailsFromSocket=[];
specialOffers:SpecialOffers[]=[];
buddyBanners:BuddyBanner[]=[];
CartItemsLocal=[];
time1;
time2;
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



  constructor(private localNotification : LocalNotificationService,private call:CallNumber,private plt:Platform,private alertCtrl:AlertController,private socketService:SocketService ,private dashboardService:DashboardService,public modalController: ModalController,private categoriesService:CategoriesService,private nativeGeocoder:NativeGeocoder,private geolocation: Geolocation,private locationAccuracy: LocationAccuracy,private cartService:CartService,private router: Router,public loadingController: LoadingController,private ordersService: OrdersService,private platform: Platform,private navController:NavController) {

this.plt.ready().then(()=>{

});



  }
  ngOnInit(): void {

    LocalNotifications.createChannel(channel);
    LocalNotifications.requestPermissions();
    LocalNotifications.registerActionTypes({
      types:[
        {
          id:'Chat_msg',
          actions:[{
            id:'view',
            title:'Open Chat'
          },
       {
         id:'remove',
         title:'Dismiss',
         destructive:true
       },
       {
         id:'respond',
         title:'Respond',
         input:true
       }

         ]
        }
      ]
    })


    this.location = JSON.parse(localStorage.getItem('LocationAddress') || '{}');
    console.log('location'+this.location.address)

    var data={
      room:this.location.locality,
      user:'user'
    }
    this.socketService.JoinRoom(data);

    this.dashboardService.GetBookingSlide(data).subscribe((res)=>{
      this.bookingSlide=res as BookingSlide[];
   })




  }

scheduleNotifications(){

}
recurringNotifications(){

}
// repeatingDaily(){
// this.localNotifications.schedule({
//   id:42,
//   title:'What would you like to eat...',
//   text:'Lets find your favorite menus from your favorite sopts...Tap to Order now...',
//   trigger:{every:{hour:1,minute:50}}
// });
// }
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



     this.showApp=true;
    // this.sendLocalNotification ();
    // this.presentModal();
    this.repeatNotification();

// this.localNotification.scheduleNotification();
     console.log('1');
    this.user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    //this.location=JSON.parse(localStorage.getItem('LocationAddress') || '{}');
    this. CartItemsLocal=JSON.parse(localStorage.getItem('CartItems') || '{}');

    var data1={
      locality:this.location.locality
    }

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

    this.dashboardService.GetAddSlide(data1).subscribe((res)=>{
      this.addSlide=res as AddSlide[];
      if(this.addSlide.length<1){
        this.showApp=false;
      }
    })
     this.dashboardService.GetBuddyBanner(data1).subscribe((res)=>{
       this.buddyBanners=res as BuddyBanner[];
     })

     this.dashboardService.GetBuddySlide(data1).subscribe((res)=>{
      this.buddySlide=res as BuddySlide[];
    })
    var data={
      // Type:'Food',
      ActiveYn:true,
      Locality:this.location.locality
    }


    this.categoriesService.GetSpecialOffersAll(data).subscribe((res)=>{
      this.specialOffers=res as SpecialOffers[];
      console.log("special offers "+this.specialOffers.length)
      //console.log("categories "+this.category);

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
 // console.log(this.orderDetails[0].DeliveryPartnerDetails.ImageUrl);
 this.orderDetailsFromSocket[0]=this.orderDetails;

console.log(this.orderDetails[0].DeliveryTime);

if(this.orderDetails.length){
  this.presentModal();
}

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
  // sendLocalNotification () {
  //   this.localNotification.showLocalNotification1 ();
  // }
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

var data={
  room:this.location.locality,
  user:'user'
}
this.socketService.JoinRoom(data);
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
     this.router.navigate(['buddy']);
  //this.router.navigate(['products']);
  }
  CalltoDeliveryBoy(mobileNo:any){
    console.log(mobileNo);
    this.call.callNumber(mobileNo,true)  .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }


  GoToRestaurant(restaurantName:string,restaurantId:string,menuId:string,type:string){
    this.router.navigate(['product-page/'+restaurantName+'/'+restaurantId+'/'+menuId+'/'+type]);
  }


  async presentModal() {
    const modal = await this.modalController.create({
      component: OrderTrackModalPage,
      breakpoints: [0, 0.3, 0.5, 0.8],
      initialBreakpoint: 0.5
    });
    await modal.present();
  }

  scheduleNotification(){
    LocalNotifications.schedule({
      notifications:[
        {
          title:'Friendly Remainder',
          body:'Join the twinker family',
          id:2,
          extra:{
            data:'pass your data handler',

          },
          iconColor:'#0000FF',
          actionTypeId:'Chat_msg',
          smallIcon:'res://ic_launcher_adaptive_fore',
        }
      ]
    })
     }


     async scheduleAdvanced(){
      await LocalNotifications.schedule({
        notifications:[
          {
            title: ' Reminder with Action',
            body: ' Hey I have action types',
            id: 2,
            sound:null,
            extra:{
              data: 'Pass data to handler'
            },
            iconColor:'#0000ff',
            actionTypeId:'Chat_msg',
            schedule:{
                at: new Date(Date.now()+1000*3),
               repeats:true,
               every:'hour',
               count:5,
               on: {
               minute: 5
               }
            },
            channelId: 'audio_channel'
          }
        ]
      });
    }


    async repeatNotification(){
      var today = new Date();
      var tomorrow = new Date();
      tomorrow.setDate(today.getDate());
      tomorrow.setHours(14);
      tomorrow.setMinutes(16);
      tomorrow.setSeconds(0);
      var tomorrow_at_11_am = new Date(tomorrow);

      var today2 = new Date();
      var tomorrow2 = new Date();
      tomorrow2.setDate(today2.getDate());
      tomorrow2.setHours(14);
      tomorrow2.setMinutes(18);
      tomorrow2.setSeconds(0);
      var tomorrow_at_5_pm = new Date(tomorrow2);

      var today3 = new Date();
      var tomorrow3 = new Date();
      tomorrow3.setDate(today3.getDate());
      tomorrow3.setHours(19);
      tomorrow3.setMinutes(10);
      tomorrow3.setSeconds(0);
      var tomorrow_at_7_pm = new Date(tomorrow3);

      var today4 = new Date();
      var tomorrow4 = new Date();
      tomorrow4.setDate(today4.getDate());
      tomorrow4.setHours(7);
      tomorrow4.setMinutes(50);
      tomorrow4.setSeconds(0);
      var tomorrow_at_7_am = new Date(tomorrow4);

      var today5 = new Date();
      var tomorrow5 = new Date();
      tomorrow5.setDate(today5.getDate());
      tomorrow5.setHours(9);
      tomorrow5.setMinutes(30);
      tomorrow5.setSeconds(0);
      var tomorrow_at_9_am = new Date(tomorrow5);

      var today6 = new Date();
      var tomorrow6 = new Date();
      tomorrow6.setDate(today6.getDate());
      tomorrow6.setHours(12);
      tomorrow6.setMinutes(20);
      tomorrow6.setSeconds(0);
      var tomorrow_at_12_pm = new Date(tomorrow6);

      var today7 = new Date();
      var tomorrow7 = new Date();
      tomorrow7.setDate(today7.getDate());
      tomorrow7.setHours(14);
      tomorrow7.setMinutes(30);
      tomorrow7.setSeconds(0);
      var tomorrow_at_2_pm = new Date(tomorrow7);

      var today8 = new Date();
      var tomorrow8 = new Date();
      tomorrow8.setDate(today8.getDate());
      tomorrow8.setHours(16);
      tomorrow8.setMinutes(10);
      tomorrow8.setSeconds(0);
      var tomorrow_at_4_pm = new Date(tomorrow8);

      var today9 = new Date();
      var tomorrow9 = new Date();
      tomorrow9.setDate(today9.getDate());
      tomorrow9.setHours(18);
      tomorrow9.setMinutes(10);
      tomorrow9.setSeconds(0);
      var tomorrow_at_6_pm = new Date(tomorrow9);


      var today10 = new Date();
      var tomorrow10 = new Date();
      tomorrow9.setDate(today10.getDate());
      tomorrow10.setHours(20);
      tomorrow10.setMinutes(30);
      tomorrow10.setSeconds(0);
      var tomorrow_at_20_pm = new Date(tomorrow10);

      var today11 = new Date();
      var tomorrow11 = new Date();
      tomorrow11.setDate(today11.getDate());
      tomorrow11.setHours(21);
      tomorrow11.setMinutes(50);
      tomorrow11.setSeconds(0);
      var tomorrow_at_21_pm = new Date(tomorrow11);


      await LocalNotifications.schedule({
        notifications:[
          {
            title: 'Grill or Tandoori?',
            body:'Grill and Tandoori are waiting for you, Tap to Order now...',
            id: 3,
            sound: null,
           // channelId: 'audio_channel',
            schedule:{
               at: tomorrow_at_7_pm,
              repeats:true,
               every:'day',
               count:1
            },

          },
          {
            id:4,
            title:'Good morning with Good Breakfast...',
            body:'Good Breakfast decides your entire day, Tap to order now...',
            sound: null,
            // channelId: 'audio_channel',
             schedule:{
                at: tomorrow_at_7_am,
               repeats:true,
                every:'day',
                count:1
             },
          },
          {
            id:5,
            title:'Are you waked up!',
            body:'Dosai wants to know that, Just tap to inform to that..',
            sound: null,
            // channelId: 'audio_channel',
             schedule:{
                at: tomorrow_at_9_am,
               repeats:true,
                every:'day',
                count:1
             },
          },
          {
            id:6,
            title:'Hey today is Biryani day...',
            body:'Biriyani or Varity meals, tap to order now...',
            sound: null,
            // channelId: 'audio_channel',
             schedule:{
                at: tomorrow_at_12_pm,
               repeats:true,
                every:'day',
                count:1
             },
          },
          {
            id:7,
            title:'Your stomach wants anything...',
            body:'Just tap to order now... Favorite dinner is yours...',
            sound: null,
            // channelId: 'audio_channel',
             schedule:{
                at: tomorrow_at_20_pm,
               repeats:true,
                every:'day',
                count:1
             },
          },
          {
            id:8,
            title:'Fresh Fruits and Jucies...',
            body:'Nooo, I would like milk shakes and fruit salats, Just tap to order now...',
            sound: null,
            // channelId: 'audio_channel',
             schedule:{
                at: tomorrow_at_2_pm,
               repeats:true,
                every:'day',
                count:1
             },
          },

          {
            id:9,
            title:'Tasty Desserts...',
            body:'Jigarthanda or Ice creams, Just take a break with us...',
            sound: null,
            // channelId: 'audio_channel',
             schedule:{
                at: tomorrow_at_4_pm,
               repeats:true,
                every:'day',
                count:1
             },
          },
          {
            id:10,
            title:'Crispy Evening...',
            body:'Age is going on... But not for your favorite foods, Just tap to order now...',
            sound: null,
            // channelId: 'audio_channel',
             schedule:{
                at: tomorrow_at_6_pm,
               repeats:true,
                every:'day',
                count:1
             },
          },
          {
            id:11,
            title:'I think you forget you dinner...',
            body:'If yes, dont wait still, tap to fullfill now...',
            sound: null,
            // channelId: 'audio_channel',
             schedule:{
                at: tomorrow_at_21_pm,
               repeats:true,
                every:'day',
                count:1
             },
          },
          {
            id:12,
            title:'Dinner specials...',
            body:'why still thinking, we are here, tap to order now...',
            sound: null,
            // channelId: 'audio_channel',
             schedule:{
                at: tomorrow_at_20_pm,
               repeats:true,
                every:'day',
                count:1
             },
          },

        ]
      })
    }

}


