import { Component, OnInit, ViewChild } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import Orders from '../models/orders';
import{OrdersService} from 'src/app/orders.service';
import {Router} from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
declare const L:any;
import { ActionSheetController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  isLinear = false;
  itemDetails:any[]=[];
  itemDetails1:any[]=[];
  panelOpenState = false;
orderDetails:Orders[]=[];
orderDetails1:Orders[]=[];
default:string="";
isLoading = false;
  user = JSON.parse(localStorage.getItem('currentUser') || '{}');

  constructor(private ordersService:OrdersService,private router:Router,public actionSheetController: ActionSheetController,private matexpansionpanel:MatExpansionModule,public loadingController: LoadingController) {

    this.default="Placed";
   }





  ngOnInit() {

    this.present();

    var getOrders={
      Status:"Placed",
      ActiveYn:true,
      UserId:this.user[0]._id
    }
   this.ordersService.GetPlacedOrders(getOrders).subscribe((res)=>{
this.orderDetails=res as Orders[];
console.log(this.orderDetails);


for(var i=0;i<this.orderDetails.length;i++){

  //ELEMENT_DATA.length=0;
  for(var j=0;j<this.orderDetails[i].ItemDetails.length;j++){

    //ELEMENT_DATA.push({position:j+1,ItemName:this.orderDetails[i].ItemDetails[j].ProductName,Price:this.orderDetails[i].ItemDetails[j].Price,Quantity:this.orderDetails[i].ItemDetails[j].ItemCount,Amount:this.orderDetails[i].ItemDetails[j].Amount});
   //ELEMENT_DATA.push({position:this.orderDetails[i].RestaurantId,ItemName:this.orderDetails[i].ItemDetails[j].ProductName,Price:this.orderDetails[i].ItemDetails[j].Price,Quantity:this.orderDetails[i].ItemDetails[j].ItemCount,Amount:this.orderDetails[i].ItemDetails[j].Amount});
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

      //ELEMENT_DATA.length=0;
      for(var j=0;j<this.orderDetails1[i].ItemDetails.length;j++){

       // ELEMENT_DATA.push({position:j+1,ItemName:this.orderDetails1[i].ItemDetails[j].ProductName,Price:this.orderDetails1[i].ItemDetails[j].Price,Quantity:this.orderDetails1[i].ItemDetails[j].ItemCount,Amount:this.orderDetails1[i].ItemDetails[j].Amount});
       //ELEMENT_DATA.push({position:this.orderDetails[i].RestaurantId,ItemName:this.orderDetails[i].ItemDetails[j].ProductName,Price:this.orderDetails[i].ItemDetails[j].Price,Quantity:this.orderDetails[i].ItemDetails[j].ItemCount,Amount:this.orderDetails[i].ItemDetails[j].Amount});
    this.itemDetails1.push(this.orderDetails1[i].ItemDetails[j])
      }
    }

    console.log("ite detailassss   "+ this.itemDetails[0]);
    this.dismiss();
       })




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
