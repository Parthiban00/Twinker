import { Component, OnInit } from '@angular/core';
import Orders from '../models/orders';
import{OrdersService} from 'src/app/orders.service';
import Restaurants from '../models/restaurants';
import {OwnersService} from 'src/app/owners.service';
import {Router} from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import{RestaurantsService} from 'src/app/restaurants.service';
import  {SocketService} from '../socket.service';
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


  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  public today1: Date = new Date();
  public currentYear: number = this.today1.getFullYear();
  public currentMonth: number = this.today1.getMonth();
  public currentDay: number = this.today1.getDate();
 public minDate: Object = new Date(this.currentYear, this.currentMonth, this.currentDay);
  public maxDate: Object =  new Date(this.currentYear, this.currentMonth+1, 15);

  totalCompletedItems=0;
  totalCompletedOrders=0;
  totalCompletedAmount=0;
  toPay=0;
    filterOrders:Orders[]=[];
  totalAmount=0;
  totalItems=0;
  totalOrders=0;
  currentSegment;
  today;
  myDate;
  myDate1="All";
  searchedItem: any;
  searchHotel:any;
  user:any;
  orderDetails:Orders[]=[];
  restaurants:Restaurants[]=[];
  selectedValue: string="";
  default:string="";
  isLoading = false;
  orderDetailsFromSocket=[];
location;
  constructor(private socketService:SocketService,private restaurantService:RestaurantsService,private alertController:AlertController,private ordersService:OrdersService,private owenerService:OwnersService,private router:Router,public loadingController: LoadingController) {
    this.default="Placed"
    this.today=new Date().toISOString();
    console.log("today date "+this.today);
  }

  selectRestaurants: SelectRestaurants[] = [ ];
  itemDetails:any[]=[];

  ngOnInit() {
  console.log("min date :"+this.currentYear+'-'+this.currentMonth+'-'+this.currentDay);

  this.location = JSON.parse(localStorage.getItem('LocationAddress') || '{}');

  var data={
    room:this.location.locality,
    user:'delivery boy'
  }
this.socketService.JoinRoom(data);

this.socketService.NewOrderPlaced().subscribe((data)=>{

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
    this.myDate1="All";
   // this.myDate;

    //this.present();
    this.user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    //console.log(this.user[0]._id)
    this.currentSegment="Placed";
    let today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

     var today1 = yyyy + '-' + mm + '-' + dd;
     this.myDate=today1;
    var getRestaurants={
      UserId:this.user[0]._id,
      ActiveYn:true,
      DeleteYn:false,


    }
this.restaurantService.GetOwnersRestaurant(getRestaurants).subscribe((res)=>{

  this.restaurants=res as Restaurants[];
  console.log('restauratns mapped by users   '+this.restaurants);

  for(var i=0;i<this.restaurants.length;i++){
    this.selectRestaurants.push({value:this.restaurants[i]._id,viewValue:this.restaurants[i].RestaurantName});
  }
  //this.dismiss();
  // this.presentAlertConfirm();
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
  RestaurantStatus:'Accepted by Restaurant',
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

  GetDate(event:any){



    const momentDate = new Date(event.value); // Replace event.value with your date value
    const formattedDate = moment(momentDate).format("YYYY-MM-DD");
    console.log("selected date:"+formattedDate);
this.myDate=formattedDate;

    if(this.myDate!="All"){
     this.present();
     if(this.selectedValue=="" || this.selectedValue==undefined || this.selectedValue==null){
       this.dismiss();
           }
       else{
     this.searchedItem=[];


     console.log("selected restaurant "+this.selectedValue);
    // this.myDate1=this.myDate.substring(0,10);
    // console.log("mydate 1 " +this.myDate1);


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
     }
     else{
 this.dismiss();
     }

  }

  CompletedOrders(segment:string){

    this.totalCompletedOrders=0;
    this.totalCompletedItems=0;
    this.totalCompletedAmount=0;
    this.toPay=0;
    for(var p=0;p<this.searchedItem.length;p++){
      if(this.searchedItem[p].Status==segment){
      this.totalCompletedOrders=this.totalCompletedOrders+1;
      this.totalCompletedAmount+=this.searchedItem[p].ItemTotal;
      for(var q=0;q<this.searchedItem[p].ItemDetails.length;q++){
  this.totalCompletedItems=this.totalCompletedItems+1;
      }
    }
    }
    this.toPay=this.totalCompletedAmount;
    console.log("total items "+this.totalCompletedItems+" total orders "+this.totalCompletedOrders+" total amount "+this.totalCompletedAmount);
  }

  FilterCancel(){
    this.myDate="All";
    this.onChange(this.selectRestaurants);
  }

  async presentAlertConfirm() {

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Notify',
      message: 'Kindly Select Restaurant on Top...',
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



interface SelectRestaurants {
  value: string;
  viewValue: string;
}
