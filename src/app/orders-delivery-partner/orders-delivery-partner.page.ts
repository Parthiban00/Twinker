import { Component, OnInit } from '@angular/core';
import Orders from '../models/orders';
import{DeliveryBoyService} from 'src/app/delivery-boy.service';
import{OwnersService} from 'src/app/owners.service'
import {Router} from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import * as moment from 'moment';
import {CallNumber} from "@ionic-native/call-number/ngx";

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
  totalCompletedItems=0;
totalCompletedOrders=0;
totalCompletedAmount=0;
segment;

myDate="All";
  constructor(private call:CallNumber,private alertController:AlertController,private loadingController:LoadingController,private deliveryService:DeliveryBoyService,private owenerService:OwnersService,private router:Router) {
    this.today1=new Date().toISOString();
    console.log("today date "+this.today1);
    this.defaultSegment="Delivery";
    this.default="Ready";


   }

  orderDetails:Orders[]=[];
  orderDetails1:Orders[]=[];
  itemDetails:any[]=[];
  itemDetails1:any[]=[];
  panelOpenState = false;
user:any;
  isLoading = false;
  //this.deliveryPartnerDetails=this.user[0];

currentUserId:any;
  ngOnInit() {





  }
  ionViewWillEnter(){
    this.GetOrderDetails();


  }


  GetOrderDetails(){
this.present();
console.log(this.segment);

this.totalCompletedOrders=0;
this.totalCompletedItems=0;
this.totalCompletedAmount=0;
this.orderDetails=[];
this.itemDetails=[];
this.user = JSON.parse(localStorage.getItem('currentUser') || '{}');
this.currentUserId=this.user[0]._id;

this.deliveryPartnerDetails.push(this.user[0]);
console.log('current user  '+this.user[0]);



var getOrders={
 ActiveYn:true

}

//  var getAcceptedOrders={
//    ActiveYn:true,
//    DeleteYn:false,
//    UserId:this.user[0]._id,
//  }

this.deliveryService.GetOrders(getOrders).subscribe((res)=>{
  this.orderDetails=res as Orders[];
  console.log(this.orderDetails[0]);

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


Accepted(id:any,restaurantId:any) {

  this.present();

  var acceptedOrders={
    _id:id,
    DeliveryPartnerStatus:'Accepted by Delivery Partner',
    RestaurantId:restaurantId,
    DeliveryPartnerDetails:{FirstName:this.user[0].FirstName,MobileNo:this.user[0].MobileNo,UserType:this.user[0].UserType,UserId:this.user[0]._id},
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
    if(ev.detail.value=="Restaurant"){
      this.default="Placed";
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
}
