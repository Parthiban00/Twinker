import { Component, OnInit } from '@angular/core';
import Orders from '../models/orders';
import{OrdersService} from 'src/app/orders.service';
import Restaurants from '../models/restaurants';
import {OwnersService} from 'src/app/owners.service';
import {Router} from '@angular/router';
import { LoadingController } from '@ionic/angular';

export interface PeriodicElement {
  itemName: string;
  position: number;
  quantity: number;
  amount: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, itemName: 'Hydrogen', quantity: 1.0079, amount: 'H'},
  {position: 2, itemName: 'Helium', quantity: 4.0026, amount: 'He'},
  {position: 3, itemName: 'Lithium', quantity: 6.941, amount: 'Li'},

];

@Component({
  selector: 'app-orders-management',
  templateUrl: './orders-management.page.html',
  styleUrls: ['./orders-management.page.scss'],
})



export class OrdersManagementPage implements OnInit {


  user:any;
  orderDetails:Orders[]=[];
  restaurants:Restaurants[]=[];
  selectedValue: string="";
  default:string="";
  isLoading = false;

  constructor(private ordersService:OrdersService,private owenerService:OwnersService,private router:Router,public loadingController: LoadingController) {
    this.default="Placed"
  }

  selectRestaurants: SelectRestaurants[] = [ ];
  itemDetails:any[]=[];

  ngOnInit() {


  }
  ionViewDidEnter(){

    this.present();
    this.user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    //console.log(this.user[0]._id)
    var getRestaurants={
      UserId:this.user[0]._id,
      ActiveYn:true,
      DeleteYn:false,

    }
this.owenerService.GetRestaurants(getRestaurants).subscribe((res)=>{

  this.restaurants=res as Restaurants[];
  console.log('restauratns mapped by users   '+this.restaurants);

  for(var i=0;i<this.restaurants.length;i++){
    this.selectRestaurants.push({value:this.restaurants[i]._id,viewValue:this.restaurants[i].RestaurantName});
  }
  this.dismiss();
})
  }

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep(id:any,restaurantId:any) {
    this.present();
    //this.step++;
var acceptedOrders={
  _id:id,
  Status:'Accepted by Restaurant Owner',
  RestaurantId:restaurantId,

}

this.owenerService.AcceptOders(acceptedOrders).subscribe((res)=>{
 // this.ngOnInit();
 // this.orderDetails=res as Orders[];
 this.onChange(this.selectRestaurants);
 this.dismiss();

})

  }

  Ready(id:any,restaurantId:any) {
    this.present();
    //this.step++;
var acceptedOrders={
  _id:id,
  Status:'Ready',
  RestaurantId:restaurantId,
}

this.owenerService.AcceptOders(acceptedOrders).subscribe((res)=>{
  this.onChange(this.selectRestaurants);
 // this.orderDetails=res as Orders[];
 this.dismiss();
})

  }

  Handled(id:any,restaurantId:any) {
    //this.step++;
var acceptedOrders={
  _id:id,
  Status:'Pickuped by Delivery Partner',
  RestaurantId:restaurantId,
}

this.owenerService.AcceptOders(acceptedOrders).subscribe((res)=>{
 // this.orderDetails=res as Orders[];
})

  }

  prevStep() {
    this.step--;
  }



  displayedColumns: string[] = ['position', 'itemName', 'quantity', 'amount'];
  dataSource = ELEMENT_DATA;

  GetOrders(event:any){

console.log(this.selectedValue);

var getOrders={
  DeleteYn:false,
  ActiveYn:true,
  RestaurantId:this.selectedValue

}

this.owenerService.GetOrders(getOrders).subscribe((res)=>{
  this.orderDetails=res as Orders[];
  console.log(this.orderDetails[0]);

  for(var i=0;i<this.orderDetails.length;i++){

    //ELEMENT_DATA.length=0;
    for(var j=0;j<this.orderDetails[i].ItemDetails.length;j++){

     //ELEMENT_DATA.push({position:this.orderDetails[i].RestaurantId,ItemName:this.orderDetails[i].ItemDetails[j].ProductName,Price:this.orderDetails[i].ItemDetails[j].Price,Quantity:this.orderDetails[i].ItemDetails[j].ItemCount,Amount:this.orderDetails[i].ItemDetails[j].Amount});
  this.itemDetails.push(this.orderDetails[i].ItemDetails[j])
    }
  }
})
  }


  segmentChanged(ev: any) {


    console.log('Segment changed', ev.detail.value);
  //console.log(this.productDetails[1].MenuId);
  this.default=ev.detail.value;
  }
  OrdersManagement(){

  }
 onChange(selectedValue){
   this.present();
   this.selectedValue=selectedValue;
   this.selectRestaurants=selectedValue;
  console.log(selectedValue);

  var getOrders={
    DeleteYn:false,
    ActiveYn:true,
    RestaurantId:selectedValue

  }

  this.owenerService.GetOrders(getOrders).subscribe((res)=>{
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

  doRefresh(event) {
    //console.log('Begin async operation');
  //this.ngOnInit();
  this.present();
  var getOrders={
    DeleteYn:false,
    ActiveYn:true,
    RestaurantId:this.selectedValue

  }

  this.owenerService.GetOrders(getOrders).subscribe((res)=>{
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

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1000);
  }

  RedirectToHome(){
    this.router.navigate(['restaurant-owner-dashboard']);
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



interface SelectRestaurants {
  value: string;
  viewValue: string;
}
