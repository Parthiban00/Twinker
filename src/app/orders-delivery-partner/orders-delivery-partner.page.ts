import { Component, OnInit } from '@angular/core';
import Orders from '../models/orders';
import{DeliveryBoyService} from 'src/app/delivery-boy.service';
import{OwnersService} from 'src/app/owners.service'
import {Router} from '@angular/router';
import { LoadingController } from '@ionic/angular';
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
  constructor(private loadingController:LoadingController,private deliveryService:DeliveryBoyService,private owenerService:OwnersService,private router:Router) {

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
  this.dismiss();
})
  }

  Accepted(id:any,restaurantId:any) {

this.present();

    //this.step++;
var acceptedOrders={
  _id:id,
  Status:'Accepted by Delivery Partner',
  RestaurantId:restaurantId,
  DeliveryPartnerDetails:{FirstName:this.user[0].FirstName,MobileNo:this.user[0].MobileNo,UserType:this.user[0].UserType,UserId:this.user[0]._id},
  ModifiedBy:this.user[0],
  ModifiedDate:this.today,
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
}
