import { Component, OnInit } from '@angular/core';
import Orders from '../models/orders';
import{DeliveryBoyService} from 'src/app/delivery-boy.service';
import{OwnersService} from 'src/app/owners.service'
import {Router} from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import * as moment from 'moment';
import {CallNumber} from "@ionic-native/call-number/ngx";
import { NativeAudio } from '@ionic-native/native-audio/ngx';
// import { Vibration } from '@ionic-native/vibration/ngx';
import { AudioManagement } from '@ionic-native/audio-management/ngx';
import {LocalNotificationService} from '../local-notification.service';

import  {BuddyService} from '../buddy.service';
//  import io from 'socket.io-client';


//  const socket=io("http://localhost:5000");
import  {SocketService} from '../socket.service';

@Component({
  selector: 'app-orders-delivery-partner',
  templateUrl: './orders-delivery-partner.page.html',
  styleUrls: ['./orders-delivery-partner.page.scss'],
})
export class OrdersDeliveryPartnerPage implements OnInit {
  default:string="";
  defaultSegment:string;
  public today: Date = new Date();
  public currentYear: number = this.today.getFullYear();
  public currentMonth: number = this.today.getMonth();
  public currentDay: number = this.today.getDate();
  deliveryPartnerDetails=new Array;
  today1;
  today22;
  totalCompletedItems=0;
totalCompletedOrders=0;
totalCompletedAmount=0;
segment;
placedOrders:Orders[]=[];
orderDetailsFromSocket=[];
orderDetailsFromSocket1;
orderDetailsFromSocket11=[];
location;
myDate="All";
deliveryBoys;
a=[];
n=0;
orderDetails11;
itemDetails11=[];
public alertMode: any;
public loopMode: any;
  constructor(private buddyService:BuddyService,private localNotification : LocalNotificationService,private nativeAudio: NativeAudio, private audio: AudioManagement,private socketService:SocketService,private call:CallNumber,private alertController:AlertController,private loadingController:LoadingController,private deliveryService:DeliveryBoyService,private owenerService:OwnersService,private router:Router) {
    this.today1=new Date().toISOString();
    console.log("today date "+this.today1);
    this.defaultSegment="Delivery";
    this.default="Ready";


   // this.socketService.NewOrderPlaced().subscribe(data=>this.placedOrders.push());




   }


  orderDetails:Orders[]=[];
  orderDetails1:Orders[]=[];

  itemDetails:any[]=[];
  itemDetails1:any[]=[];
  panelOpenState = false;
user:any;
  isLoading = false;
  buddyorder:any;

  //this.deliveryPartnerDetails=this.user[0];

currentUserId:any;
  ngOnInit() {









    this.location = JSON.parse(localStorage.getItem('LocationAddress') || '{}');

    var data={
      room:this.location.locality,
      user:'delivery boy'
    }
this.socketService.JoinRoom(data);

this.socketService.NewOrderPlaced().subscribe((data)=>{
  // this.sendLocalNotification ();

  this.orderDetailsFromSocket=[];
  console.log("hi this sockert"+data);
  //this.orderDetailsFromSocket1.push(data.data);
  this.orderDetailsFromSocket.push(data.data);
  console.log("orderDetailsFromSocket -----------"+JSON.stringify(this.orderDetailsFromSocket));

  console.log("orderDetailsFromSocket1111111111111 -----------"+this.orderDetailsFromSocket[0].length);

  //this.createAlert();

  });

  }
  ionViewWillEnter(){
    this.localNotification.scheduleNotification();
    let today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

     this.today22= yyyy + '-' + mm + '-' + dd;
     console.log("created date "+this.today22)
    this.setRingtone();



    this.GetOrderDetails();

    //  socket.on('orderPlaced',data=>{
    //    console.log("response from socekt------- "+data);
    //  })

    //  socket.emit('orderPlaced');


var data1={
Locality:this.location.locality,
CreatedDate:this.today22
}

this.buddyService.GetSubmittedOrders(data1).subscribe((res)=>{

this.buddyorder = res
//console.log('buddy orders'+this.buddyorder[0].UserDetails.FirstName)
})

  }


  GetOrderDetails(){
this.present();

var data1={
  Locality:this.location.locality
  }
console.log(this.segment);



this.totalCompletedOrders=0;
this.totalCompletedItems=0;
this.totalCompletedAmount=0;
this.orderDetails=[];
this.orderDetails11=[];
this.itemDetails=[];
this.user = JSON.parse(localStorage.getItem('currentUser') || '{}');
this.currentUserId=this.user[0]._id;

this.deliveryPartnerDetails.push(this.user[0]);
console.log('current user  '+this.user[0]);



var getOrders={
 ActiveYn:true,
 Locality:this.location.locality,
 CreatedDate:this.today22

}

//  var getAcceptedOrders={
//    ActiveYn:true,
//    DeleteYn:false,
//    UserId:this.user[0]._id,
//  }

this.deliveryService.GetOrdersPlaced(getOrders).subscribe((res)=>{
  this.orderDetails11=res as Orders[];
  console.log("hi this is order ddd "+this.orderDetails11);
  // this.orderDetails11=this.orderDetails;
  for(var i=0;i<this.orderDetails11.length;i++){

    //ELEMENT_DATA.length=0;
    for(var j=0;j<this.orderDetails11[i].ItemDetails.length;j++){

     //ELEMENT_DATA.push({position:this.orderDetails[i].RestaurantId,ItemName:this.orderDetails[i].ItemDetails[j].ProductName,Price:this.orderDetails[i].ItemDetails[j].Price,Quantity:this.orderDetails[i].ItemDetails[j].ItemCount,Amount:this.orderDetails[i].ItemDetails[j].Amount});
  this.itemDetails11.push(this.orderDetails11[i].ItemDetails[j])
    }
  }
  this.CompletedOrders(this.segment);
  this.dismiss();
})

this.deliveryService.GetOrdersLocality(getOrders).subscribe((res)=>{
  this.orderDetails=res as Orders[];
  console.log("hi this is order "+this.orderDetails);
  this.orderDetailsFromSocket[0]=this.orderDetails;
  for(var i=0;i<this.orderDetails.length;i++){

    //ELEMENT_DATA.length=0;
    for(var j=0;j<this.orderDetails[i].ItemDetails.length;j++){

     //ELEMENT_DATA.push({position:this.orderDetails[i].RestaurantId,ItemName:this.orderDetails[i].ItemDetails[j].ProductName,Price:this.orderDetails[i].ItemDetails[j].Price,Quantity:this.orderDetails[i].ItemDetails[j].ItemCount,Amount:this.orderDetails[i].ItemDetails[j].Amount});
  this.itemDetails.push(this.orderDetails[i].ItemDetails[j])
    }
  }
  this.CompletedOrders(this.segment);
  this.dismiss();
})
  }

  indexOfSmallest(a){
    var lowest=0;
    for(var i=1;i<a.length;i++){
      if(a[i]<a[lowest]){
        lowest=i;
      }
    }
    return lowest;
  }

//   Accepted(id:any,restaurantId:any) {

// this.present();

// var acceptedOrders={
//   _id:id,
//   Status:'Accepted by Delivery Partner',
//   RestaurantId:restaurantId,
//   DeliveryPartnerDetails:{FirstName:this.user[0].FirstName,MobileNo:this.user[0].MobileNo,UserType:this.user[0].UserType,UserId:this.user[0]._id},
//   ModifiedBy:this.user[0],
//   ModifiedDate: this.myDate.substring(0,10),
//   ActiveYn:true,
//   DeleteYn:false,
//   PreviousStatus:'Ready'
// }
// console.log("delivery partner details  "+this.user[0]);

//   this.owenerService.DeliveryPartnerAccept(acceptedOrders).subscribe((res)=>{
// this.dismiss();
// console.log("result   "+res);
// if(res==null || res==undefined){
//   this.presentAlertConfirm1();
// }
// this.GetOrderDetails();

//   },err=>{
//     this.dismiss();
//     console.log("error "+err)
//   },()=>console.log("proecss completed"))
//   }


Accepted(id:any,restaurantId:any,userId:any) {

  this.present();

  var acceptedOrders={
    _id:id,
    DeliveryPartnerStatus:'Accepted by Delivery Partner',
    RestaurantId:restaurantId,
    DeliveryPartnerDetails:{FirstName:this.user[0].FirstName,MobileNo:this.user[0].MobileNo,UserType:this.user[0].UserType,UserId:this.user[0]._id,ImageUrl:this.user[0].ImageUrl},
    ModifiedBy:this.user[0],
    ModifiedDate: this.myDate.substring(0,10),
    ActiveYn:true,
    DeleteYn:false,
    PreviousStatus:'Placed by Customer'
  }
  console.log("delivery partner details  "+this.user[0]);

    this.owenerService.DeliveryPartnerAccept(acceptedOrders).subscribe((res)=>{
  this.dismiss();
  console.log("result   "+res);

  var data={
    room:this.location.locality,
    user:'delivery boy',
    orderUserId:userId
  }
this.socketService.OrderAcceptedByDeliveryPartner(data);

  if(res==null || res==undefined){
    this.presentAlertConfirm1();
  }
  this.GetOrderDetails();

    },err=>{
      this.dismiss();
      console.log("error "+err)
    },()=>console.log("proecss completed"))
    }



  Delivered(id:any,restaurantId:any) {
    this.present();
    //this.step++;
var acceptedOrders={
  _id:id,
  DeliveryPartnerStatus:'Completed',
  RestaurantId:restaurantId,
  DeliveryPartnerDetails:{FirstName:this.user[0].FirstName,MobileNo:this.user[0].MobileNo,UserType:this.user[0].UserType,UserId:this.user[0]._id},
  ModifiedBy:this.user[0],
  ModifiedDate:this.today,
  ActiveYn:true,
  DeleteYn:false,
  PreviousStatus:'Accepted by Delivery Partner'
}

this.owenerService.DeliveryPartnerAccept(acceptedOrders).subscribe((res)=>{
 // this.orderDetails=res as Orders[];
this.dismiss();
 this.GetOrderDetails();
})
  }


  segmentChanged(ev: any) {


    console.log('Segment changed', ev.detail.value);

    if(ev.detail.value=="Delivery"){
      this.default="Ready";
    }
    // if(ev.detail.value=="Restaurant"){
    //   this.default="Placed";
    // }
    if(ev.detail.value=="Buddy"){
      this.default="Submited";
    }
  //console.log(this.productDetails[1].MenuId);
  //this.default=ev.detail.value;

  if(this.defaultSegment=='Delivery'){
    if(ev.detail.value=='Completed'){
      this.segment='Completed'
      this.CompletedOrders(this.segment);
    }
    else if(ev.detail.value=='Accepted'){
      this.segment='Accepted by Delivery Partner';
      this.CompletedOrders(this.segment);
    }
    else if(ev.detail.value=='Ready'){
      this.segment='';
      //this.CompletedOrders(this.segment);
      this. totalCompletedItems=0;
      this.totalCompletedOrders=0;
      this.totalCompletedAmount=0;
    }
  }
  else if(this.defaultSegment=='Restaurant'){
   this. totalCompletedItems=0;
    this.totalCompletedOrders=0;
    this.totalCompletedAmount=0;
  }

  }
  RedirectToHome(){
    this.router.navigate(['delivery-partner-dashboard']);
  }
  doRefresh(event) {
    //console.log('Begin async operation');
  this.ionViewWillEnter();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1000);
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

  GetDate(event:any){


    const momentDate = new Date(event.value); // Replace event.value with your date value
    const formattedDate = moment(momentDate).format("YYYY-MM-DD");
    console.log("selected date:"+formattedDate);
this.myDate=formattedDate;
    if(this.myDate!="All"){


    this.present();
    var i;
    this.totalCompletedItems=0;
    this.totalCompletedOrders=0;
    this.totalCompletedAmount=0;
    this.orderDetails=[];
    this.itemDetails=[];
    //this.myDate=this.myDate.substring(0,10);
    var getOrders={
      ActiveYn:true,
      DeleteYn:false,
      CreatedDate:this.myDate
    }
console.log("get Date");

this.deliveryService.GetFilteredOrders(getOrders).subscribe((res)=>{
  this.orderDetails=res as Orders[];
  console.log(this.orderDetails[0]);

  for( i=0;i<this.orderDetails.length;i++){


    for(var j=0;j<this.orderDetails[i].ItemDetails.length;j++){


  this.itemDetails.push(this.orderDetails[i].ItemDetails[j])
    }

    if(i==this.orderDetails.length-1){
    //console.log("value of i   "+i);
    this.CompletedOrders(this.segment);
    }
  }

},err=>{
  console.log("error "+err)
},()=>console.log("proecss completed"))
this.dismiss();
  }
  else{
    this.dismiss();
  }

  }

  FilterCancel(){
this.myDate="All";
    this.GetOrderDetails();
  }

  CompletedOrders(segment:string){
console.log("dfasfas"+ segment);
    this.totalCompletedOrders=0;
    this.totalCompletedItems=0;
    this.totalCompletedAmount=0;
    for(var p=0;p<this.orderDetails.length;p++){
      if(this.orderDetails[p].DeliveryPartnerStatus==segment && this.orderDetails[p].DeliveryPartnerDetails.UserId==this.currentUserId){
      this.totalCompletedOrders=this.totalCompletedOrders+1;
      this.totalCompletedAmount+=this.orderDetails[p].ActualAmount;
      for(var q=0;q<this.orderDetails[p].ItemDetails.length;q++){
  this.totalCompletedItems=this.totalCompletedItems+1;
      }
    }
    }
    console.log("total items "+this.totalCompletedItems+" total orders "+this.totalCompletedOrders+" total amount "+this.totalCompletedAmount);
  }

  async presentAlertConfirm1() {

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Notify!',
      message: '<small>This Order is <strong>Acceptey by Another One</strong>. Kindly <strong> Refresh Page and Do Accept Orders...</strong></small>',
      buttons: [

       {

          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');



          }



        }


      ]
    });

    await alert.present();
  }

  CallCustomer(MobileNo:string){
 this.call.callNumber(MobileNo,true)  .then(res => console.log('Launched dialer!', res))
 .catch(err => console.log('Error launching dialer', err));
  }

  NavigateDirection(lat,lon){
    let originVal="";
    let modeVal="driving";
    //let url="https://www.google.com/maps/dir/?api=1&travelmode="+modeVal+"&layer=traffic&origin="+lat+","+lon+"&destination"+lat+","+lon;
window.open('https://www.google.com/maps/dir/?api=1&destination='+lat+','+lon)
//window.open(url);
  }



  setRingtone() {
    // Preload the audio track
    console.log("set ringtone entered   ------");
    this.nativeAudio.preloadSimple('uniqueId1', 'assets/notification.mp3');
  }

  getAudioMode() {
    return new Promise(async (resolve, reject) => {
      this.audio.getAudioMode().then((value) => {
        if (value.audioMode == 0 || value.audioMode == 1) { // this will cause vibration in silent mode as well
          this.alertMode = 'Vibrate';
          resolve(false);
        } else {
          this.alertMode = 'Ring';
          resolve(true);
        }
      }).catch((error) => {
        resolve(false);
      })
    });
  }

  async createAlert() {
    const audioMode = await this.getAudioMode();
    if (audioMode) { // ring mode
       this.playSingle();
    } else {
      this.playSingle();
    }
  }
  // sendLocalNotification () {
  //   this.localNotification.showLocalNotification ( 1 , " New Order Placed ", "You have a New Order, Tap to find this...");
  // }
  playSingle() {
    this.nativeAudio.play('uniqueId1').then(() => {
      console.log('Successfully played');
     // this.showAlert();
    }).catch((err) => {
      console.log('error', err);
    });
  }
}
