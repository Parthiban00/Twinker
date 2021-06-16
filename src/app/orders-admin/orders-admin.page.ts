import { Component, OnInit } from '@angular/core';
import Orders from '../models/orders';
import{OrdersService} from 'src/app/orders.service';
import Restaurants from '../models/restaurants';
import {OwnersService} from 'src/app/owners.service';
import {Router} from '@angular/router';
import { LoadingController } from '@ionic/angular';
import{RestaurantsService} from 'src/app/restaurants.service';
import Restaurant from '../models/restaurants';

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
  selector: 'app-orders-admin',
  templateUrl: './orders-admin.page.html',
  styleUrls: ['./orders-admin.page.scss'],
})


export class OrdersAdminPage implements OnInit {
  public list: Array<Object> = [];
  searchedItem: any;
toastMsg="";
  searchHotel:any;
  user:any;
  orderDetails:Orders[]=[];
  restaurants:Restaurants[]=[];
  selectedValue: string="";
  default:string="";
  isLoading = false;
  restaurantDetails:Restaurant[]=[];
  constructor(private ordersService:OrdersService,private owenerService:OwnersService,private router:Router,public loadingController: LoadingController,private restaurantService:RestaurantsService) {
    this.default="Placed"
  }

  selectRestaurants: SelectRestaurants[] = [ ];
  itemDetails:any[]=[];

  ngOnInit() {


  }
  ionViewDidEnter(){

    this.present();
    this.user = JSON.parse(localStorage.getItem('currentUser') || '{}');




this.restaurantService.GetRestaurants().subscribe((res)=>{


  this.restaurants=res as Restaurants[];


  for(var i=0;i<this.restaurants.length;i++){
    this.selectRestaurants.push({value:this.restaurants[i]._id,viewValue:this.restaurants[i].RestaurantName});
  }
  this.dismiss();





});
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
  this.searchedItem = res as Orders[];
  console.log(this.orderDetails[0]);

  for(var i=0;i<this.orderDetails.length;i++){


    for(var j=0;j<this.orderDetails[i].ItemDetails.length;j++){


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
    this.searchedItem = res as Orders[];
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
    this.router.navigate(['admin-dashboard']);
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

  SearchChange(event){
    console.log("search change "+event.detail.value);
    this.searchedItem = this.orderDetails;
    console.log("rest details"+this.orderDetails);
    const val = event.target.value;
    if (val && val.trim() != '') {
      this.searchedItem = this.searchedItem.filter((item: any) => {
        console.log(item._id.toLowerCase().indexOf(val.toLowerCase()) > -1);
        return (item._id.toLowerCase().indexOf(val.toLowerCase()) > -1);

      })
    }

  }



}


interface SelectRestaurants {
  value: string;
  viewValue: string;
}
