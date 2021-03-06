import { Component, OnInit } from '@angular/core';
import Orders from '../models/orders';
import{DeliveryBoyService} from 'src/app/delivery-boy.service';
import{OwnersService} from 'src/app/owners.service'
import {Router} from '@angular/router';
import { LoadingController } from '@ionic/angular';
import {RegisterUserService} from 'src/app/register-user.service';
import Register from '../models/register-user';
import { AlertController } from '@ionic/angular';

import * as moment from 'moment';
@Component({
  selector: 'app-orders-delivery-admin',
  templateUrl: './orders-delivery-admin.page.html',
  styleUrls: ['./orders-delivery-admin.page.scss'],
})
export class OrdersDeliveryAdminPage implements OnInit {
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
selectedValue: string="";
selectedDate;
myDate="All";

selected: Date | null;
deliveryPartners:any;
deliveryPartners1:any;
registeredUsers:Register[]=[];
  constructor(private alertController:AlertController,private registerUserService:RegisterUserService,private loadingController:LoadingController,private deliveryService:DeliveryBoyService,private owenerService:OwnersService,private router:Router) {
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
    this.GetRegisteredUsers();
    //this.GetOrderDetails();
    this.presentAlertConfirm();
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
//this.currentUserId=this.user[0]._id;

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

  Accepted(id:any,restaurantId:any) {

this.present();
//this.myDate=this..substring(0,10);
    //this.step++;
var acceptedOrders={
  _id:id,
  Status:'Accepted by Delivery Partner',
  RestaurantId:restaurantId,
  DeliveryPartnerDetails:{FirstName:this.user[0].FirstName,MobileNo:this.user[0].MobileNo,UserType:this.user[0].UserType,UserId:this.user[0]._id},
  ModifiedBy:this.user[0],
  ModifiedDate: this.myDate.substring(0,10),
  ActiveYn:true,
  DeleteYn:false
}
console.log("delivery partner details  "+this.user[0]);

  this.owenerService.DeliveryPartnerAccept(acceptedOrders).subscribe((res)=>{
this.dismiss();
this.GetOrderDetails();

  })
  }

  Delivered(id:any,restaurantId:any) {
    this.present();
    //this.step++;
var acceptedOrders={
  _id:id,
  Status:'Completed',
  RestaurantId:restaurantId,
  DeliveryPartnerDetails:{FirstName:this.user[0].FirstName,MobileNo:this.user[0].MobileNo,UserType:this.user[0].UserType,UserId:this.user[0]._id},
  ModifiedBy:this.user[0],
  ModifiedDate:this.today,
  ActiveYn:true,
  DeleteYn:false
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
  onDate(event:any){
    console.log("on date changes :"+event);
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

})
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

  onChange(selectedValue){
this.currentUserId=selectedValue;
this.GetOrderDetails();

  }
  GetRegisteredUsers(){
    //this.present
    var i;
    this.deliveryPartners=[];
    this.registerUserService.GetRegisteredUsers().subscribe((res)=>{

      this.registeredUsers=res as Register[];
      console.log("Registered Users "+this.registeredUsers);
      for(i=0;i<this.registeredUsers.length;i++){
        if(this.registeredUsers[i].UserType=='D'){
          this.deliveryPartners.push(this.registeredUsers[i]);
        }
        if(i==this.registeredUsers.length-1){
this.deliveryPartners1=this.deliveryPartners;
        }
      }
    })
    }
    async presentAlertConfirm() {

      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Notify',
        message: '<small>Kindly Select Delivery Partner on Top...</small>',
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
}
