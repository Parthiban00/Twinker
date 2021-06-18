import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
//import { Geolocation } from '@ionic-native/geolocation/ngx';
//import { Geolocation } from '@capacitor/geolocation';
import { Geolocation } from '@ionic-native/geolocation/ngx';
//import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { ActionSheetController } from '@ionic/angular';
import {RegisterUserService} from 'src/app/register-user.service';
import Cart from '../models/cart';
import DeliveryLocations from '../models/delivery-locations';
import PlaceOrder from '../models/place-order';
import Restaurant from '../models/restaurants';
import{CartService} from 'src/app/cart.service';
import {Router} from '@angular/router';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import Orders from '../models/orders';
//import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  deliveryPartnerFee1:String;
totalAmount=0;
totalAmount1:String;
  taxesAndCharges=0;
  deliveryPartnerFee:number;
itemAmount=0;
selectedLocation:any;
  reverseGeocodingResults:any;
  lat:any;
  lon:any;
  address:string="";
  default:string="";
  allOrders:Orders[]=[];
  isLoading = false;
  constructor(public toastController: ToastController,private alertController:AlertController,private geolocation: Geolocation,private router:Router,private nativeGeocoder:NativeGeocoder,public actionSheetController: ActionSheetController,private cartService:CartService,private registerUserService:RegisterUserService,public loadingController: LoadingController) {

this.default="Delivery";



  }

  restaurantName:string="";

  dateRange:string="";
  cartItems:Cart[]=[];

selectedAddressId:string="";
  addressClickStatus: boolean = false;
  deliveryLocation:DeliveryLocations[]=[];
selectedTab:String="";
isChecked:boolean=false;
continuousDelivery:boolean=false;
date1:String="";
date2:String="";
panelOpenState = false;
selectedAddress:String="";
newAddress="";
restaurantDetails:Restaurant[]=[];
distanceKm:any;
user:any;




  cartItemsAll:Cart[]=[];

  placeOder:PlaceOrder[]=[];

   placeOrderArr=new Array;


   unit="K";
   coord:any;


  ngOnInit() {





  }

  ionViewDidEnter(){


    this.present();

    this.user = JSON.parse(localStorage.getItem('currentUser') || '{}');



    this.geolocation.getCurrentPosition({



      timeout:10000,
      enableHighAccuracy:true
    }).then((resp) => {

      this.lat=resp.coords.latitude;
      this.lon=resp.coords.longitude;

      this.ReverseGeocoding(this.lat,this.lon);

     }).catch((error) => {
       console.log('Error getting location', error);
     });


    var itemTotal=0;

    var getCart={
      UserId:this.user[0]._id,
      Status:"Cart",
      ActiveYn:true,
      DeleteYn:false
    }



    this.cartService.GetCartAll(getCart).subscribe((res)=>{
      this.cartItemsAll=res as Cart[];
      console.log(this.cartItemsAll);

if(this.cartItemsAll.length==0){
this.dismiss();

 this.cartEmpty();
}

var restaurantCredential={
  RestaurantId:this.cartItemsAll[0].RestaurantId,
      }
this.cartService.GetRestaurant(restaurantCredential).subscribe((res)=>{
  this.restaurantDetails=res as Restaurant[];





this.dismiss();

            this.distance(this.lat,this.lon,this.restaurantDetails[0].Latitude,this.restaurantDetails[0].Longitude);



      })



      for(var i=0;i<this.cartItemsAll.length;i++){
        itemTotal+=this.cartItemsAll[i].Amount;
        this.itemAmount=itemTotal;
        this.restaurantName=this.cartItemsAll[i].RestaurantName;
        }



        //console.log(itemTotal);


    });




this.GetAllOrders();
   }



  DeliveryLocations(){

    var getDeliveryLocations={
      UserId:this.user[0]._id,
      ActiveYn:true
    }
    this.cartService.GetDeliveryAddress(getDeliveryLocations).subscribe((res)=>{
      this.deliveryLocation=res as DeliveryLocations[];
      console.log(this.deliveryLocation);


      for(var j=0;j<this.deliveryLocation.length;j++){
        if(this.deliveryLocation[j].Recent=='Yes'){

        }
      }

    })
  }


  viewBillDetails(){

  }



clearDate(event:any) {
  console.log(event);
  event.stopPropagation();
  this.date1="";
  this.date2="";
}
onChecked(event:any){
  if (event.checked == true) {
    console.log("Continuous Delivery Checked")
    this.continuousDelivery=true;
  } else {
    console.log("Continuous Delivery Unchecked")
    this.continuousDelivery=false;
  }

}




IncreaseCount(i:any){

this.present();
  this.cartItemsAll[i].ItemCount=this.cartItemsAll[i].ItemCount+1;
  this.cartItemsAll[i].Amount=this.cartItemsAll[i].Price*this.cartItemsAll[i].ItemCount;




  var addCartItems={

    RestaurantId:this.cartItemsAll[i].RestaurantId,
    RestaurantName:this.cartItemsAll[i].RestaurantName,
    MenuId:this.cartItemsAll[i].MenuId,
    MenuName:this.cartItemsAll[i].MenuName,
    ProductId:this.cartItemsAll[i].ProductId,
    ProductName:this.cartItemsAll[i].ProductName,
    Price:this.cartItemsAll[i].Price,
    ItemCount:this.cartItemsAll[i].ItemCount,
    Amount:this.cartItemsAll[i].Amount,
    UserId:this.cartItemsAll[i].UserId,
    UserName:this.cartItemsAll[i].UserName,
    MobileNo:this.cartItemsAll[i].MobileNo,
    Address:this.cartItemsAll[i].Address,
    CartItemId:this.cartItemsAll[i]._id,

    Status:"Cart",
    ActiveYn:true,
    DeleteYn:false



   }

   //console.log(addCartItems);


   this.cartService.UpdateCart1(addCartItems).subscribe((res)=>{
     this.cartItems=res as Cart[];

this.dismiss();
     //this.reloadCurrentRoute();
    // this.ngOnInit();
     this.ionViewDidEnter();

  })

  }
  DecreaseCount(i:any){

this.present();

    this.cartItemsAll[i].ItemCount=this.cartItemsAll[i].ItemCount-1;
    this.cartItemsAll[i].Amount=this.cartItemsAll[i].Price*this.cartItemsAll[i].ItemCount;


    var addCartItems={

      RestaurantId:this.cartItemsAll[i].RestaurantId,
      RestaurantName:this.cartItemsAll[i].RestaurantName,
      MenuId:this.cartItemsAll[i].MenuId,
      MenuName:this.cartItemsAll[i].MenuName,
      ProductId:this.cartItemsAll[i].ProductId,
      ProductName:this.cartItemsAll[i].ProductName,
      Price:this.cartItemsAll[i].Price,
      ItemCount:this.cartItemsAll[i].ItemCount,
      Amount:this.cartItemsAll[i].Amount,
      UserId:this.cartItemsAll[i].UserId,
      UserName:this.cartItemsAll[i].UserName,
      MobileNo:this.cartItemsAll[i].MobileNo,
      Address:this.cartItemsAll[i].Address,
      CartItemId:this.cartItemsAll[i]._id,

      Status:"Cart",
      ActiveYn:true,
      DeleteYn:false



     }

    if(this.cartItemsAll[i].ItemCount>0){

      this.cartService.UpdateCart1(addCartItems).subscribe((res)=>{
        this.cartItems=res as Cart[];

       // this.reloadCurrentRoute();
     //  this.ngOnInit();
     this.ionViewDidEnter();
      });
    }
    else if(this.cartItemsAll[i].ItemCount==0){

     // console.log('item count 0');

      this.cartService.ItemCountZero1(addCartItems).subscribe((res)=>{
        this.cartItems=res as Cart[];

       // this.reloadCurrentRoute();
      this.dismiss();
      //this.router.navigate(['home']);

      // this.ngOnInit();
      this.ionViewDidEnter();
      });
    }
  }


  onItemChange(value:any){
    //console.log(" Value is : ", value );
    this.selectedAddress=value;
  }

  AddAddress(){
   // console.log(this.newAddress);

     // this.deliveryAddress.push({id:this.deliveryAddress[0].id,userid:this.deliveryAddress[0].userid,deliveryAdd:this.newAddress});
    //console.log(this.deliveryAddress);

    var newLocation={
      UserId:this.user[0]._id,
      UserName:this.user[0].FirstName,
      MobileNo:this.user[0].MobileNo,
      Address:this.newAddress,
      ActiveYn:true,
      DeleteYn:false,
      UserType:this.user[0].UserType
    }

    this.registerUserService.deliveryLocation(newLocation).subscribe((res)=>{

      this.deliveryLocation=res as DeliveryLocations[];
  this.newAddress="";

    //  this.ngOnInit();
    this.ionViewDidEnter();
            })

  }

  getValue(newAddress:string,id:string){



      this.addressClickStatus=true;

    this.selectedAddressId=id;
    this.selectedAddress=newAddress;

  }

  RemoveAddress(id:string,UserId:String){
    //console.log(id+' '+UserId );

    var removeAddress={
  UserId:UserId,
  id:id,
  ActiveYn:true
    }

    this.cartService.RemoveAddress(removeAddress).subscribe((res)=>{


    //  this.DeliveryLocations();
    });

  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
       // console.log(currentUrl);
    });
  }


  PlaceOrder(){
    //console.log("last order "+ this.allOrders[this.allOrders.length-1].OrderId);
    this.present();

    if(this.selectedLocation=="" || this.selectedLocation==undefined || this.selectedLocation==null){
      this.dismiss();
      this.presentAlertConfirm1();
    }
    else{

    let today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

var today1 = yyyy + '-' + mm + '-' + dd;

    var orderId1="ORD_ID-";
    let orderId2:number=0;

    let ExistingOrderId:string= this.allOrders[this.allOrders.length-1].OrderId;
    if(ExistingOrderId==undefined || ExistingOrderId==null || ExistingOrderId==" "){
      ExistingOrderId="ORD_ID-0"
    }
    else{
    var subs=ExistingOrderId.split("-");
  let idIncrement:number=parseInt(subs[1])+1;

    //console.log(idIncrement);
    var orderId=orderId1+idIncrement;
    }
   // console.log(orderId);




    //var date=this.currentYear+'-'+(this.currentMonth+1)+'-'+this.currentDay;


    this.placeOrderArr=[];



   var updateCartPlaced={
     Status:'Placed',
     ActiveYn:true,
     DeleteYn:false

    }

    for(var i=0;i<this.cartItemsAll.length;i++){

  this.placeOrderArr.push( this.cartItemsAll[i]);
  //this.placeOrderArr.push(this.cartItemsAll[i]);
    }

    //console.log(this.placeOrderArr);

   var billDetials={
     OrderId:orderId,

     UserId:this.user[0]._id,
     UserName:this.user[0].FirstName,
     RestaurantId:this.cartItemsAll[0].RestaurantId,
     RestaurantName:this.cartItemsAll[0].RestaurantName,
     ItemTotal:this.itemAmount,
     DeliveryPartnerFee:this.deliveryPartnerFee,
     TaxesAndCharges:this.taxesAndCharges,
     TotalAmount:this.totalAmount,
     ActiveYn:true,
     DeleteYn:false,
     Status:'Placed',
     CreatedDate:today1,
     CreatedBy:this.user[0]._id,
     ItemCount:this.cartItemsAll.length,
     MobileNo:this.user[0].MobileNo,
     Address:this.selectedLocation,
     ItemDetails:this.placeOrderArr

   }




   //console.log(billDetials);

     this.cartService.OrderDetails(billDetials).subscribe((res)=>{

      this.cartService.UpdateCartPlaced(updateCartPlaced).subscribe((res)=>{

       })

  //    // this.openDialog();
  //   //this.reloadCurrentRoute();
  //this.presentToast();
  this.dismiss();
  this.presentAlertConfirm();


   })
  }
  }

  distance(lat1:any, lon1:any, lat2:any, lon2:any)
  {
this.present();

    var R = 6371; // km
    var dLat = this.toRad(lat2-lat1);
    var dLon = this.toRad(lon2-lon1);
     lat1 = this.toRad(lat1);
     lat2 = this.toRad(lat2);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
console.log("distance d "+ d);
    this.distanceKm=d;
    if(this.distanceKm>2){

      console.log("distance d  >2"+ d);
            this.deliveryPartnerFee=(this.distanceKm*8);
            this.deliveryPartnerFee1=this.deliveryPartnerFee.toFixed(2);

this.totalAmount=this.itemAmount+this.deliveryPartnerFee+this.taxesAndCharges;
this.totalAmount1=this.totalAmount.toFixed(2);
this.dismiss();

          }
           else if(this.distanceKm<=2){


            this.deliveryPartnerFee=20;
            this.deliveryPartnerFee1=this.deliveryPartnerFee.toFixed(2);
            this.totalAmount=this.itemAmount+this.deliveryPartnerFee+this.taxesAndCharges;
            this.totalAmount1=this.totalAmount.toFixed(2);
            this.dismiss();
           }
          //
   // return d;

  }

   toRad(Value:any)
  {
      return Value * Math.PI / 180;
  }


  tabChanged(event:any) {
    console.log('Clicked: ' + event.tab.textLabel);
  this.selectedTab=event.tab.textLabel;


  if(this.selectedTab=="Pickup"){
  console.log('Pickup');
  //this.transactions[1].charges=0;
  //this.transactions[2].charges=10;
  }
  else if(this.selectedTab=="Dinein"){
  //this.transactions[1].charges=0;
  //this.transactions[2].charges=0;
  }
  else{

    if(this.distanceKm>=1){
    //  this.transactions[1].charges=this.distanceKm*12;

    }
    else{
      //this.transactions[1].charges=20;
    }


  //this.transactions[2].charges=8;
  }
  }




  segmentChanged(event:any){
console.log(event.target.value);
this.default=event.target.value;

if(event.target.value=="Pickup"){
  console.log('Pickup');
  //this.transactions[1].charges=0;
  //this.transactions[2].charges=10;
  }
  else if(event.target.value=="Dinein"){
  //this.transactions[1].charges=0;
  //this.transactions[2].charges=0;
  }
  else{

    if(this.distanceKm>=1){
    //  this.transactions[1].charges=this.distanceKm*12;

    }
    else{
      //this.transactions[1].charges=20;
    }


  //this.transactions[2].charges=8;
  }
  }



  ReverseGeocoding(lat:any,lon:any){

//this.present();
  var options:NativeGeocoderOptions={
    useLocale:true,
    maxResults:1
  }
    this.nativeGeocoder.reverseGeocode(lat,lon,options).then((results)=>{
this.reverseGeocodingResults=JSON.stringify(results[0]);

this.selectedLocation=JSON.stringify(results[0].thoroughfare).replace(/"/g, "")+','+JSON.stringify(results[0].locality).replace(/"/g, "")+','+JSON.stringify(results[0].subAdministrativeArea).replace(/"/g, "")+','+JSON.stringify(results[0].administrativeArea).replace(/"/g, "")+','+JSON.stringify(results[0].countryName).replace(/"/g, "")+','+JSON.stringify(results[0].countryCode).replace(/"/g, "");

//this.dismiss();
})
  }




  DeliveryAddress(){
this.presentActionSheet();
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
          this.present();

          this.geolocation.getCurrentPosition({

            timeout:10000,
            enableHighAccuracy:true
          }).then((resp) => {

            this.lat=resp.coords.latitude;
            this.lon=resp.coords.longitude;


            this.ReverseGeocoding(this.lat,this.lon);
            this.dismiss();
           }).catch((error) => {
             console.log('Error getting location', error);
           });

           let watch = this.geolocation.watchPosition();
           watch.subscribe((data) => {


           });

        }


      }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async cartEmpty() {
   // this.dismiss();
   // this.dismiss();
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
     // header: 'ohooo! Empty...',
      message: '<stron>Ohooo! Empty...</strong>',
      buttons: [
       {
          text: 'Place Order',
          handler: () => {
            console.log('Confirm Okay');

            this.router.navigate(['home-page']);

          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertConfirm() {

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
     // header: 'Successfull',
      message: '<strong>Order Placed...</strong><img  src="assets/order_placed.gif">',
      buttons: [
       {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');

            this.router.navigate(['home-page']);

          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: "Order Placed Successfull...",
      duration: 2000
    });
    toast.present();
  }

  doRefresh(event) {
   // this.ngOnInit();
   this.ionViewDidEnter();

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, );
  }
  RedirectToHome(){
    this.router.navigate(['home-page']);
  }

  GetAllOrders(){

    this.cartService.GetAllOrders().subscribe((res)=>{

      this.allOrders=res as Orders[];
      console.log("all orders "+this.allOrders);
length=this.allOrders.length;
console.log("length: "+length);
console.log("last order "+ this.allOrders[this.allOrders.length-1].OrderId);
   })

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


  async presentAlertConfirm1() {

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Ooooh!',
      message: 'Make sure gps location on your device. We cannot take your delivery location automatically. kindly <strong>Click Okay</strong> to try again.',
      buttons: [

       {

          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');

          this.ionViewDidEnter();

          }



        }


      ]
    });

    await alert.present();
  }

}
