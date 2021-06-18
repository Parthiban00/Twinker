import { Component, OnInit ,OnDestroy, HostListener} from '@angular/core';
import Orders from '../models/orders';
import{OrdersService} from 'src/app/orders.service';
import Restaurants from '../models/restaurants';
import {OwnersService} from 'src/app/owners.service';
import {Router} from '@angular/router';
import { LoadingController } from '@ionic/angular';
import{RestaurantsService} from 'src/app/restaurants.service';
import Restaurant from '../models/restaurants';
import { ActionSheetController } from '@ionic/angular';

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

  public today1: Date = new Date();
  public currentYear: number = this.today1.getFullYear();
  public currentMonth: number = this.today1.getMonth();
  public currentDay: number = this.today1.getDate();
 public minDate: Object = new Date(this.currentYear, this.currentMonth, this.currentDay);
  public maxDate: Object =  new Date(this.currentYear, this.currentMonth+1, 15);

totalCompletedItems=0;
totalCompletedOrders=0;
totalCompletedAmount=0;

  filterOrders:Orders[]=[];
totalAmount=0;
totalItems=0;
totalOrders=0;
currentSegment;
today;
myDate="All";
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
  constructor(public actionSheetController: ActionSheetController,private ordersService:OrdersService,private owenerService:OwnersService,private router:Router,public loadingController: LoadingController,private restaurantService:RestaurantsService) {
    this.default="Placed"
    this.today=new Date().toISOString();
    console.log("today date "+this.today);
  }

  selectRestaurants: SelectRestaurants[] = [ ];
  itemDetails:any[]=[];

  ngOnInit() {
    console.log("min date :"+this.currentYear+'-'+this.currentMonth+'-'+this.currentDay);

  }
  ionViewDidEnter(){
this.isLoading=false;
    this.present();
    this.user = JSON.parse(localStorage.getItem('currentUser') || '{}');
this.currentSegment="Placed";



this.restaurantService.GetRestaurants().subscribe((res)=>{


  this.restaurants=res as Restaurants[];


  for(var i=0;i<this.restaurants.length;i++){
    this.selectRestaurants.push({value:this.restaurants[i]._id,viewValue:this.restaurants[i].RestaurantName});
  }






});
this.dismiss();
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

console.log("rest id :"+this.selectedValue);

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
this.totalAmount+=this.orderDetails[i].TotalAmount;

    for(var j=0;j<this.orderDetails[i].ItemDetails.length;j++){

this.totalItems+=this.totalItems;

  this.itemDetails.push(this.orderDetails[i].ItemDetails[j])
    }
  }
  console.log("totalAmount :"+this.totalAmount+" totalitems  :"+this.totalItems);
})
  }


  segmentChanged(ev: any) {


    console.log('Segment changed', ev.detail.value);
  //console.log(this.productDetails[1].MenuId);
  this.default=ev.detail.value;
  if(this.default=='Completed'){
    this.currentSegment='Completed';
    this.CompletedOrders(this.currentSegment);
  }
  else if(this.default=='Placed'){
    this.currentSegment='Placed';
    this.CompletedOrders(this.currentSegment);
  }
  else if(this.default=='Accepted'){
    this.currentSegment='Accepted by Restaurant Owner';
    this.CompletedOrders(this.currentSegment);
  }
  else if(this.default=='Ready'){
    this.currentSegment='Ready';
    this.CompletedOrders(this.currentSegment);
  }
  else if(this.default=='Pending'){
    this.currentSegment='Accepted by Delivery Partner';
    this.CompletedOrders(this.currentSegment);
  }

  }
  OrdersManagement(){

  }
 onChange(selectedValue){
  this.present();
   this.totalItems=0;
   this.totalAmount=0;

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
      this.totalAmount+=this.orderDetails[i].ItemTotal;
      //ELEMENT_DATA.length=0;
      for(var j=0;j<this.orderDetails[i].ItemDetails.length;j++){
this.totalItems=this.totalItems+1;
       //ELEMENT_DATA.push({position:this.orderDetails[i].RestaurantId,ItemName:this.orderDetails[i].ItemDetails[j].ProductName,Price:this.orderDetails[i].ItemDetails[j].Price,Quantity:this.orderDetails[i].ItemDetails[j].ItemCount,Amount:this.orderDetails[i].ItemDetails[j].Amount});
    this.itemDetails.push(this.orderDetails[i].ItemDetails[j])
      }
    }

    console.log("total amount "+this.totalAmount+" total items :"+this.totalItems+" total orders :"+this.orderDetails.length);
    this.CompletedOrders(this.currentSegment);
    //this.myDate="All";
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

  GetDate(){


    this.present();
    this.searchedItem=[];


    console.log("selected restaurant "+this.selectedValue);
    this.myDate=this.myDate.substring(0,10);
    //console.log("selected Date: "+this.myDate);

//     for(var i=0;i<this.orderDetails.length;i++){
//       if(this.myDate==this.orderDetails[i].CreatedDate && this.selectedValue==this.orderDetails[i].RestaurantId){
//         this.filterOrders.push(this.orderDetails[i]);
//       }
//     }
// this.searchedItem=this.filterOrders;

var filterOrders={

  CreatedDate:this.myDate,
  RestaurantId:this.selectedValue,
  ActiveYn:true,
  DeleteYn:false
}


this.ordersService.GetFilteredOders(filterOrders).subscribe((res)=>{


  this.orderDetails=res as Orders[];
console.log("filtered orders "+this.filterOrders[0]);
this.searchedItem=res as Orders[];
this.CompletedOrders(this.currentSegment);
this.dismiss();
});



  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Delivery Location',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Current Location',
        role: 'destructive',
        icon: 'location',
        handler: () => {
        //  datePicker.open();


        }


      }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

FilterCancel(){
  //this.myDate="All";
  this.onChange(this.selectRestaurants);
}

CompletedOrders(segment:string){

  this.totalCompletedOrders=0;
  this.totalCompletedItems=0;
  this.totalCompletedAmount=0;
  for(var p=0;p<this.searchedItem.length;p++){
    if(this.searchedItem[p].Status==segment){
    this.totalCompletedOrders=this.totalCompletedOrders+1;
    this.totalCompletedAmount+=this.searchedItem[p].ItemTotal;
    for(var q=0;q<this.searchedItem[p].ItemDetails.length;q++){
this.totalCompletedItems=this.totalCompletedItems+1;
    }
  }
  }
  console.log("total items "+this.totalCompletedItems+" total orders "+this.totalCompletedOrders+" total amount "+this.totalCompletedAmount);
}


}


interface SelectRestaurants {
  value: string;
  viewValue: string;
}
