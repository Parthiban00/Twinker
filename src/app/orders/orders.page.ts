import { Component, OnInit, ViewChild } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import Orders from '../models/orders';
import{OrdersService} from 'src/app/orders.service';
import {Router} from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
declare const L:any;
import { ActionSheetController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import {OwnersService} from 'src/app/owners.service';
import {CallNumber} from "@ionic-native/call-number/ngx";
@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  isLinear = false;
  itemDetails:any[]=[];
  itemDetails1:any[]=[];
  itemDetails2:any[]=[];
  panelOpenState = false;
orderDetails:Orders[]=[];
orderDetails1:Orders[]=[];
orderDetails2:Orders[]=[];
default:string="";
isLoading = false;
user:any;

  constructor(private call:CallNumber,private ownerService:OwnersService,private ordersService:OrdersService,private router:Router,public actionSheetController: ActionSheetController,private matexpansionpanel:MatExpansionModule,public loadingController: LoadingController) {

    this.default="Placed";
   }



ionViewWillEnter(){

  this.present();
this.user = JSON.parse(localStorage.getItem('currentUser') || '{}');
  var getOrders={
    Status:"Placed",
    ActiveYn:true,
    UserId:this.user[0]._id
  }
 this.ordersService.GetPlacedOrders(getOrders).subscribe((res)=>{
this.orderDetails=res as Orders[];
console.log(this.orderDetails);


for(var i=0;i<this.orderDetails.length;i++){


for(var j=0;j<this.orderDetails[i].ItemDetails.length;j++){

this.itemDetails.push(this.orderDetails[i].ItemDetails[j])
}
}

console.log("ite detailassss   "+ this.itemDetails[0]);
 })

 var getOrders1={
  Status:"Completed",
  ActiveYn:true,
  UserId:this.user[0]._id
}


this.ordersService.GetPlacedOrders(getOrders1).subscribe((res)=>{
  this.orderDetails1=res as Orders[];
  console.log('completed orders: '+this.orderDetails1);


  for(var i=0;i<this.orderDetails1.length;i++){


    for(var j=0;j<this.orderDetails1[i].ItemDetails.length;j++){

  this.itemDetails1.push(this.orderDetails1[i].ItemDetails[j])
    }
  }

  console.log("ite detailassss   "+ this.itemDetails[0]);
  this.dismiss();
     })


     var getOrders2={
      Status:"Canceled by Customer",
      ActiveYn:true,
      UserId:this.user[0]._id
    }

     this.ordersService.GetPlacedOrders(getOrders2).subscribe((res)=>{
      this.orderDetails2=res as Orders[];
      console.log('completed orders: '+this.orderDetails2);


      for(var i=0;i<this.orderDetails2.length;i++){


        for(var j=0;j<this.orderDetails2[i].ItemDetails.length;j++){

      this.itemDetails2.push(this.orderDetails2[i].ItemDetails[j])
        }
      }

      console.log("ite detailassss   "+ this.itemDetails[0]);
      this.dismiss();
         })


}

  ngOnInit() {



  }

  segmentChanged(ev: any) {


    console.log('Segment changed', ev.detail.value);
  //console.log(this.productDetails[1].MenuId);
  this.default=ev.detail.value;
  }

  displayedColumns: string[] = ['position', 'itemName', 'price', 'quantity','amount'];


  dataSource = ELEMENT_DATA;
  //dataSource =;


  RedirectToHome(){
    this.router.navigate(['home-page']);
  }



  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Placed',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Order Details',
        role: 'destructive',
        icon: 'location',
        handler: () => {
console.log("Order details is clicked");


        }

      }, {
        text: 'Item Details',
        icon: 'share',
        handler: () => {
          console.log('Item details clicked');
        }
      }, {
        text: 'Bill Details',
        icon: 'share',
        handler: () => {
          console.log('Bill details clicked');
        }
      }, {
        text: 'Track Order',
        icon: 'share',
        handler: () => {
          console.log('Track clicked');
        }







      }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
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


  CancelOrder(id:any,restaurantId:any) {
    this.present();
    //this.step++;
var cancelOrders={
  _id:id,
  Status:'Canceled by Customer',
  RestaurantId:restaurantId,

}

this.ownerService.CancelOders(cancelOrders).subscribe((res)=>{
 // this.ngOnInit();
 // this.orderDetails=res as Orders[];

 this.dismiss();
 this.ionViewWillEnter();

})

  }

  CallCustomer(MobileNo:any){
  this.call.callNumber(MobileNo,true)
  .then(res => console.log('Launched dialer!', res))
   .catch(err => console.log('Error launching dialer', err));
      }
}
export interface PeriodicElement {
  ItemName: string;
  position: number;
  Price: number;
  Quantity: number;
  Amount: number;


}


const ELEMENT_DATA: PeriodicElement[] = [



];
