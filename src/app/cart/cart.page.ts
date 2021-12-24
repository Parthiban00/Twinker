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
import Offers from '../models/offers';
import PlaceOrder from '../models/place-order';
import Restaurant from '../models/restaurants';
import{CartService} from 'src/app/cart.service';
import {Router} from '@angular/router';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import Orders from '../models/orders';
import{ProductsService} from 'src/app/products.service';
import MainMenu from '../models/main-menu';
import Product from '../models/products';
import Coupons from '../models/coupons';
import Register from '../models/register-user';
import DeliveryCharges from '../models/delivery-charges';
import  {SocketService} from '../socket.service';
import { ModalController } from '@ionic/angular';
import{DeliveryBoyService} from 'src/app/delivery-boy.service';
import { DeliveryCustomisePage } from '../delivery-customise/delivery-customise.page';
import {ChangeLocationPage} from '../change-location/change-location.page';
import {OffersPage} from '../offers/offers.page';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
// import io from 'socket.io-client';

// const socket=io("http://localhost:5000");
declare var Razorpay:any;

//import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage  {
  coupon;
  mainMenu:MainMenu[]=[];
  productDetails:Product[]=[];
  products:Product[]=[];
  deliveryPartnerFee1:String;
  deliveryCharges:DeliveryCharges[];
totalAmount=0;
totalAmount1;
discount=0;
AmountWithCharges;
  taxesAndCharges=0;
  deliveryPartnerFee:number;
  Charges:number;
itemAmount;
actualAmount=0;
menuAmount=0;
selectedLocation:any;
  reverseGeocodingResults:any;
  lat:any;
  lon:any;
  address:string="";
  default:string="";
  allOrders:Orders[]=[];
  isLoading = false;
  discountDescription="";
  coupons:Coupons[]=[];
  discountCode="";
  couponPresent:boolean;
  getUser:Register[];
  offers:Offers[];
  toastMsg:string;
  locality;
  deliveryBoyImage;
  totalCompletedItems=0;
  totalCompletedOrders=0;
  totalCompletedAmount=0;
  segment;
  placedOrders:Orders[]=[];
  orderDetailsFromSocket=[];
  orderDetailsFromSocket1;
  orderDetailsFromSocket11=[];
  orderDetails:Orders[]=[];
  orderDetails1:Orders[]=[];

  itemDetails:any[]=[];
  itemDetails1:any[]=[];
  myDate="All";
  deliveryBoys;
  a=[];
n=0;
deliveryPartnerDetails=new Array;
billDetials:any;
currentUserId:any;
deliveryBoyId;
deliveryBoyName;
deliveryBoyMobileNo;
deliveryBoyType;
  constructor(private deliveryService:DeliveryBoyService,private socketService:SocketService ,public modalController: ModalController,private productService:ProductsService, public toastController: ToastController,private alertController:AlertController,private geolocation: Geolocation,private router:Router,private nativeGeocoder:NativeGeocoder,public actionSheetController: ActionSheetController,private cartService:CartService,private registerUserService:RegisterUserService,public loadingController: LoadingController) {

this.default="Delivery";




  }

  restaurantName:string="";

  dateRange:string="";
  cartItems:Cart[]=[];

selectedAddressId:string="";
  addressClickStatus: boolean = false;

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
user;
customizeDelivery;
location;
applied:boolean;
couponApplied:boolean;
  cartItemsAll:Cart[]=[];
today1;
time;
  placeOder:PlaceOrder[]=[];

   placeOrderArr=new Array;


   unit="K";
   coord:any;



  ionViewWillEnter(){

    // socket.emit('cartPageCheck',"cart page entered successfull");
    // socket.on('orderPlaced',data=>{
    //   console.log("response from socekt------- "+data);
    // })
//     var data={
//       room:'twinker',
//       user:'user'
//     }
// this.socketService.JoinRoom(data);

    // ---------------------------------------------------------------------getDate------------------------
    this.user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.location = JSON.parse(localStorage.getItem('LocationAddress') || '{}');
    let today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

     this.today1 = yyyy + '-' + mm + '-' + dd;
// --------------------------------------------------------------------------get Date end----------------------
// ----------------------------------------------------------------------------get Time-----------------------------
var d = new Date(); // for now
d.getHours(); // => 9
d.getMinutes(); // =>  30
d.getSeconds(); // => 51
this.time=d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();
// ----------------------------------------------------------------------------get Time end-----------------------------


this.applied=false;
this.coupon="";
this.discount=0;
this.discountDescription="";
this.discountCode="";
this.couponPresent=true;
this.couponApplied=false;
    // var element = <HTMLInputElement> document.getElementById("coupon");
    // element.disabled = false;
    // var element1 = <HTMLInputElement> document.getElementById("applybtn");
    // element1.disabled = false;
    this.present();

 this.customizeDelivery={
   continuousDelivery:false,




    }




    this.GetDeliveryBoys();

console.log("location address "+this.location.address);
this.selectedLocation=this.location.address;
this.locality=this.location.locality;
console.log('locality '+this.location.locality)

var data={
Locality:this.locality
}

this.cartService.GetUserDetails(this.user[0]._id).subscribe((res)=>{
this.getUser=res as Register[];
console.log('get user for welcome offer '+this.getUser.length);
})

this.cartService.GetOffers(data).subscribe((res)=>{
  this.offers=res as Offers[];
  console.log("offers "+this.offers[1].Code);
})

this.cartService.GetAllCoupons().subscribe((res)=>{
this.coupons=res as Coupons[];
console.log("all coupons"+this.coupons[0]);
})



    var itemTotal=0;
    var itemActual=0;

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
//this.dismiss();

 //this.cartEmpty();
}

var restaurantCredential={
  RestaurantId:this.cartItemsAll[0].RestaurantId,

      }

     // this.dismiss();
this.cartService.GetRestaurant(restaurantCredential).subscribe((res)=>{
  this.restaurantDetails=res as Restaurant[];
this.Charges=this.restaurantDetails[0].Charges;
console.log("restaurant type "+this.restaurantDetails[0].Type);

var data={
  type:this.cartItemsAll[0].Type
}
this.cartService.GetDeliveryChargeDetails(data).subscribe((res)=>{
  this.deliveryCharges=res as DeliveryCharges[];
  console.log("delivery charge "+typeof(this.deliveryCharges[0].PerKm));

  const deliveryCharge=this.distance(this.location.lat,this.location.lon,this.restaurantDetails[0].Latitude,this.restaurantDetails[0].Longitude);
  console.log("delivery charges "+deliveryCharge);
  this.DeliveryChargeCal(deliveryCharge,this.deliveryCharges);
})



// if(this.location.lat==null || this.location.lat=="" || this.location.lat==undefined || this.location.lat==NaN){
//   this.geolocation.getCurrentPosition({



//     timeout:10000,
//     enableHighAccuracy:true
//   }).then((resp) => {

//     this.lat=resp.coords.latitude;
//     this.lon=resp.coords.longitude;

//     const getAddress= this.ReverseGeocoding(this.lat,this.lon);
//     this.selectedLocation=getAddress;

//    }).catch((error) => {
//      console.log('Error getting location', error);
//    });

//    setTimeout(() => {
//     const deliveryCharge=this.distance(this.lat,this.lon,this.restaurantDetails[0].Latitude,this.restaurantDetails[0].Longitude);
//     console.log("delivery charges "+deliveryCharge);
//     this.DeliveryChargeCal(deliveryCharge);
//    }, 2000);



// }

// else{
//   const deliveryCharge=this.distance(this.location.lat,this.location.lon,this.restaurantDetails[0].Latitude,this.restaurantDetails[0].Longitude);
//   console.log("delivery charges "+deliveryCharge);
//   this.DeliveryChargeCal(deliveryCharge);
// }






      })



      for(var i=0;i<this.cartItemsAll.length;i++){

        itemTotal+=this.cartItemsAll[i].Amount;
        itemActual+=this.cartItemsAll[i].ActualAmount;
        this.itemAmount=itemTotal;
        this.actualAmount=itemActual;
        this.restaurantName=this.cartItemsAll[i].RestaurantName;
        }



        //console.log(itemTotal);

        this.GetSuggestions(restaurantCredential.RestaurantId);
    });


this.dismiss();

this.GetAllOrders();
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

//this.present();
  this.cartItemsAll[i].ItemCount=this.cartItemsAll[i].ItemCount+1;
  this.cartItemsAll[i].Amount=this.cartItemsAll[i].Price*this.cartItemsAll[i].ItemCount;
  this.cartItemsAll[i].ActualAmount=this.cartItemsAll[i].ActualPrice*this.cartItemsAll[i].ItemCount;




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
    ActualPrice:this.cartItemsAll[i].ActualPrice,
    Status:"Cart",
    ActiveYn:true,
    DeleteYn:false,
    Offer:this.cartItemsAll[i].Offer,
    ActualAmount:this.cartItemsAll[i].ActualAmount


   }
   if(this.cartItemsAll[i].Offer){
    addCartItems.Price=this.cartItemsAll[i].Price;
      }
   //console.log(addCartItems);


   this.cartService.UpdateCart1(addCartItems).subscribe((res)=>{
     this.cartItems=res as Cart[];

//this.dismiss();
     //this.reloadCurrentRoute();
    // this.ngOnInit();
     this.ionViewWillEnter();

  })

  }
  DecreaseCount(i:any){

//this.present();

    this.cartItemsAll[i].ItemCount=this.cartItemsAll[i].ItemCount-1;
    this.cartItemsAll[i].Amount=this.cartItemsAll[i].Price*this.cartItemsAll[i].ItemCount;
    this.cartItemsAll[i].ActualAmount=this.cartItemsAll[i].ActualPrice*this.cartItemsAll[i].ItemCount;

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
      ActualPrice:this.cartItemsAll[i].ActualPrice,
      Status:"Cart",
      ActiveYn:true,
      DeleteYn:false,
      Offer:this.cartItemsAll[i].Offer,
      ActualAmount:this.cartItemsAll[i].ActualAmount

     }

    if(this.cartItemsAll[i].ItemCount>0){

      this.cartService.UpdateCart1(addCartItems).subscribe((res)=>{
        this.cartItems=res as Cart[];

       // this.reloadCurrentRoute();
     //  this.ngOnInit();
     this.ionViewWillEnter();
      });
    }
    else if(this.cartItemsAll[i].ItemCount==0){

     // console.log('item count 0');

      this.cartService.ItemCountZero1(addCartItems).subscribe((res)=>{
        this.cartItems=res as Cart[];

       // this.reloadCurrentRoute();
     // this.dismiss();
      //this.router.navigate(['home']);

      // this.ngOnInit();
      this.ionViewWillEnter();
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






    this.present();

    if(this.selectedLocation=="" || this.selectedLocation==undefined || this.selectedLocation==null){
      this.dismiss();
     this.presentAlertConfirm1();

    }

    else{




    this.placeOrderArr=[];



   var updateCartPlaced={
     Status:'Placed',
     ActiveYn:true,
     DeleteYn:false,
     UserId:this.user[0]._id,

    }

    for(var i=0;i<this.cartItemsAll.length;i++){

  this.placeOrderArr.push( this.cartItemsAll[i]);

    }



   this. billDetials={


     UserId:this.user[0]._id,
     UserName:this.user[0].FirstName,
     RestaurantId:this.cartItemsAll[0].RestaurantId,
     RestaurantName:this.cartItemsAll[0].RestaurantName,
     ItemTotal:this.itemAmount,
     DeliveryPartnerFee:this.deliveryPartnerFee,
     TaxesAndCharges:this.Charges,
     TotalAmount:parseFloat(this.totalAmount1),
     ActiveYn:true,
     DeleteYn:false,
     Status:'Placed',
     CreatedDate:this.today1,
     CreatedBy:this.user[0]._id,
     ItemCount:this.cartItemsAll.length,
     MobileNo:this.user[0].MobileNo,
     Address:this.selectedLocation,
     ItemDetails:this.placeOrderArr,
     DeliveryPartnerStatus:"Placed by Customer",
     ActualAmount:parseFloat(this.AmountWithCharges).toFixed(2),
CreatedTime:this.time,
Discount:this.discount,
DiscountDescritpion:this.discountDescription,
DiscountCode:this.discountCode,
Latitude:this.location.lat,
Longitude:this.location.lon,
DeliveryTime:this.restaurantDetails[0].DeliveryTime,
Locality:this.locality,
 DeliveryPartnerDetails:{
   UserId:this.deliveryBoyId,FirstName:this.deliveryBoyName,MobileNo:this.deliveryBoyMobileNo,UserType:this.deliveryBoyType,ImageUrl:this.deliveryBoyImage
 }


   }




   //console.log(billDetials);

     this.cartService.OrderDetails(this.billDetials).subscribe((res)=>{
      // socket.emit('orderPlaced',"orderPlaced successful");

      this.cartService.UpdateCartPlaced(updateCartPlaced).subscribe((res)=>{

       })
  this.dismiss();
  this.presentAlertConfirm();
  var data={
    room:this.locality,
    user:'user'
  }
this.socketService.OrderPlaced(data);

   })
  }
  }

  distance(lat1:any, lon1:any, lat2:any, lon2:any)
  {





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


          //
    return d;


  }





// ---------------------------------------------------------------------------------delivery charge calc-------------------------
DeliveryChargeCal(d,deliveryChargeDetails:any){

  console.log("delivery carge cal entered "+d);
  console.log("delivery charge cal with delivery charge details "+deliveryChargeDetails[0].MinimumDeliveryCharge);
this.distanceKm=d;

  if(d>=3){
   // console.log("delivery carge cal entered "+d);

    console.log("distance d  >2"+ d);
          this.deliveryPartnerFee=Math.round((d*deliveryChargeDetails[0].PerKm));
          this.deliveryPartnerFee1=this.deliveryPartnerFee.toFixed(1);



          this.AmountWithCharges=Math.round(((this.itemAmount*(this.Charges/100))+this.itemAmount)).toFixed(2);
         // console.log("Amount with chargers "+this.AmountWithCharges )
this.totalAmount=Math.round(parseFloat(this.AmountWithCharges)+this.deliveryPartnerFee);
//console.log("total amount"+this.totalAmount);
this.totalAmount1=this.totalAmount.toFixed(2);


this.dismiss();

        }
         else if(d<3){
          console.log("delivery carge cal entered 2 if "+d);

          this.deliveryPartnerFee=deliveryChargeDetails[0].MinimumDeliveryCharge;
          this.deliveryPartnerFee1=this.deliveryPartnerFee.toFixed(1);

          this.AmountWithCharges=Math.round(((this.itemAmount*(this.Charges/100))+this.itemAmount).toFixed(2));
          this.totalAmount=Math.round(parseFloat(this.AmountWithCharges)+this.deliveryPartnerFee);
          //console.log("total amount"+this.totalAmount);
          this.totalAmount1=this.totalAmount.toFixed(2);


          this.dismiss();
         }
         else{
          console.log("delivery carge cal entered  else"+d);
           this.dismiss();
          // this.presentAlertConfirm2();
         // this.ionViewWillEnter();
         }
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
return this.selectedLocation;
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


           const GetAddress= this.ReverseGeocoding(this.lat,this.lon);
           this.selectedLocation=GetAddress;
            this.dismiss();
           }).catch((error) => {
             console.log('Error getting location', error);
           });

           let watch = this.geolocation.watchPosition();
           watch.subscribe((data) => {


           });

        }


      }],

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
      message: '<img  src="assets/order_placedNew.gif">',
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
      message: "This Offer is Not Eligible for U",
      duration: 3000
    });
    toast.present();
  }

  doRefresh(event) {
   // this.IningOnt();
   this.ionViewWillEnter();

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
      //console.log("all orders "+this.allOrders);
//length=this.allOrders.length;
//console.log("length: "+length);
//console.log("last order "+ this.allOrders[this.allOrders.length-1].OrderId);
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
      header: 'Ooops!',
      message: '<small>kindly Set Your Delivery Location...</small>',
      buttons: [

       {

          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            this.ChangeLocation();
         // this.ionViewWillEnter();


          }



        }


      ]
    });

    await alert.present();
  }


  async presentAlertConfirmtToPlace() {
     if(!this.restaurantDetails[0].AvailableStatus){
      this.presentAlertConfirm3();
    }
    else if(this.deliveryBoys.length<1){
      this.presentAlertConfirm4();
    }
    else{
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Payment Type',
      message: 'Cash On Delivery (Cash | UPI)',
      buttons: [


        {

          text: 'Cancel',
          handler: () => {
            console.log('cancel place');
            //this.PlaceOrder();
            this.ionViewWillEnter();



          }



        },
        {

          text: 'Confirm',
          handler: () => {
            console.log('Confirm Okay');
            this.PlaceOrder();



          }



        }


      ]
    });

    await alert.present();
  }
  }


  async presentAlertConfirm2() {
//this.dismiss();
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Ooops!',
      message: '<small>We cannot fetch your Delivery Details. kindly <strong>Click Okay</strong> to try again...</small>',
      buttons: [

       {

          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');

          this.ionViewWillEnter();

          }



        }


      ]
    });

    await alert.present();
  }


  async presentAlertConfirm3() {
    //this.dismiss();
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Ooops!',
          message: '<small>Sorry, Currently this restaurant is unavailable. Kindly try when this is available. Thanks</small>',
          buttons: [

           {

              text: 'Okay',
              handler: () => {
                console.log('Confirm Okay');

              this.ionViewWillEnter();

              }



            }


          ]
        });

        await alert.present();
      }


      async presentAlertConfirm4() {
        //this.dismiss();
            const alert = await this.alertController.create({
              cssClass: 'my-custom-class',
              header: 'Ooops!',
              message: '<small>Sorry, All delivery boys are busy, Kindly try after some few minutes. Thank you</small>',
              buttons: [

               {

                  text: 'Okay',
                  handler: () => {
                    console.log('Confirm Okay');

                  this.ionViewWillEnter();

                  }



                }


              ]
            });

            await alert.present();
          }

  GetSuggestions(restaurantId:String){
console.log("enter suggestions "+restaurantId);
var data={
  restaurantId:restaurantId,
  suggestion:true,

}
  this.productService.GetSuggestionProducts(data).subscribe((res)=>{
    this.products=res as Product[];
    console.log(this.productDetails);
    //console.log("test    "+this.products[0].ImageUrl)









    })
  }

  IncreaseItem(i:number,menuId:String){


  //this.getCartAll();
  //this.present();


  let date: Date = new Date();



   this.products[i].ItemCount=this.products[i].ItemCount+1;
   if(this.products[i].Offer){
   this.products[i].Amount=this.products[i].OfferPrice*this.products[i].ItemCount;
   }
   else{
    this.products[i].Amount=this.products[i].Price*this.products[i].ItemCount;
   }

   var addCartItems={

    RestaurantId:this.cartItemsAll[0].RestaurantId,
    RestaurantName:this.restaurantName,
    MenuId:menuId,
    MenuName:"",
    ProductId:this.products[i]._id,
    ProductName:this.products[i].ProductName,
    ActualPrice:this.products[i].Price,
    Price:this.products[i].Price,
    ItemCount:this.products[i].ItemCount,
    Amount:this.products[i].Amount,
    UserId:this.user[0]._id,
    UserName:this.user[0].FirstName,
    MobileNo:this.user[0].MobileNo,
    Address:this.user[0].Address,
    CreatedDate:date,
    CreatedBy:this.user[0]._id,
    Status:"Cart",
    ActiveYn:true,
    DeleteYn:false,
    Offer:this.products[i].Offer,
    OfferDescription:this.products[i].OfferDescription,
    Commission:this.products[i].Commission




   }

   if(this.products[i].Offer){
    addCartItems.Price=this.products[i].OfferPrice;
      }

   var getCart={
     UserId:this.user[0]._id,
    MenuId:menuId,
    ProductId:this.products[i]._id,
     Status:"Cart",
     ActiveYn:true
   }

   // --------------------------------------------  to get all cart items----------------------------------------

this.cartService.GetCartAll(getCart).subscribe((res)=>{
  this.cartItemsAll=res as Cart[];

})
// -------------------------------------------- ----------------------------------------

   console.log(addCartItems);
   this.cartService.GetCart(getCart).subscribe((res)=>{
    this.cartItems=res as Cart[];
    console.log("cart Items ---- "+this.cartItems);





    if(!this.cartItemsAll.length){
      if(!this.cartItems.length){

        console.log("Cart is empty");
        this.cartService.AddCart(addCartItems).subscribe((res)=>{
          this.cartItems=res as Cart[];

         // this.getCartAll();
         this.ionViewWillEnter();

        })
      }
    }
      else if(this.cartItemsAll.length && !this.cartItems.length && this.cartItemsAll[0].RestaurantId==this.cartItemsAll[0].RestaurantId){



          console.log("Cart is empty");
        this.cartService.AddCart(addCartItems).subscribe((res)=>{
          this.cartItems=res as Cart[];
        //  this.getCartAll();
        this.ionViewWillEnter();
        })
        }
        else if(this.cartItemsAll.length && !this.cartItems.length && this.cartItemsAll[0].RestaurantId!=this.cartItemsAll[0].RestaurantId){

//this.dismiss();






        }





    else if( this.cartItems.length && this.cartItems[0].RestaurantId==addCartItems.RestaurantId){

//update cart items(item count and amount)
                  this.cartService.UpdateCart(addCartItems).subscribe((res)=>{
                    this.cartItems=res as Cart[];

                   // this.getCartAll();
                   this.ionViewWillEnter();
                  });
    }else {


    }






   })

  }

  DecreaseItem(i:number,menuId:String){

  }

  PaymentPage(){



  }
  ApplyCoupon(){
    var discountPrice;
    console.log(this.coupon);
    let today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    var today1 = yyyy + '-' + mm + '-' + dd;


    for(var i=0;i<this.offers.length;i++){

      if(this.offers[i].Code==this.coupon && this.offers[i].CodeDescription=="WelcomeOffer" && this.offers[i].ActiveYn==true){
        if(this.getUser.length){
          console.log("get user in apply copon entered");
          discountPrice=this.AmountWithCharges-(this.AmountWithCharges*(this.offers[i].Discount/100));
          this.AmountWithCharges=Math.round(discountPrice).toFixed(2);
            this.totalAmount1=Math.round((discountPrice+this.deliveryPartnerFee)).toFixed(2);
            this.discount=this.offers[i].Discount;
            this.applied=true;
            this.discountDescription=this.offers[i].CodeDescription;
            this.discountCode=this.offers[i].Code
            this.couponPresent=true;
             this.couponApplied=true;
        }
        else{
          // this.couponPresent=false;
          //    this.couponApplied=false;
          //    this.applied=false;
          this.couponPresent=false;
          this.presentToast();
        }

      }
      else if(this.offers[i].Code==this.coupon && this.offers[i].RestaurantId==this.cartItemsAll[0].RestaurantId && this.offers[i].ActiveYn==true && this.offers[i].CodeDescription=="This Restaurant Only"){

          console.log("get user in apply copon entered");
          discountPrice=this.AmountWithCharges-(this.AmountWithCharges*(this.offers[i].Discount/100));
          this.AmountWithCharges=Math.round(discountPrice).toFixed(2);
            this.totalAmount1=Math.round((discountPrice+this.deliveryPartnerFee)).toFixed(2);
            this.discount=this.offers[i].Discount;
            this.applied=true;
            this.discountDescription=this.offers[i].CodeDescription;
            this.discountCode=this.offers[i].Code
            this.couponPresent=true;
             this.couponApplied=true;


      }
      else if(this.offers[i].Code==this.coupon && this.offers[i].CodeDescription=="Minimum Offfer All"){

        if(this.offers[i].MinimumAmount<=this.AmountWithCharges){

          console.log("get user in apply copon entered");
          discountPrice=this.AmountWithCharges-(this.AmountWithCharges*(this.offers[i].Discount/100));
          this.AmountWithCharges=Math.round(discountPrice).toFixed(2);
            this.totalAmount1=Math.round((discountPrice+this.deliveryPartnerFee)).toFixed(2);
            this.discount=this.offers[i].Discount;
            this.applied=true;
            this.discountDescription=this.offers[i].CodeDescription;
            this.discountCode=this.offers[i].Code
            this.couponPresent=true;
             this.couponApplied=true;
        }
        else{
          this.couponPresent=false;
          this.presentToast();
        }

      }
      else{
        this.couponPresent=false;
      }


    }



      }



      CustomizeDeliveryDetails(){
        this.modalController.create({
component:DeliveryCustomisePage
        }).then(modalres=>{
          modalres.present();

          modalres.onDidDismiss().then(res=>{
            if(res.data!=null){

            }
          })
        })
      }

      ChangeLocation(){
        this.modalController.create({
          component:ChangeLocationPage,
          componentProps:this.location
                  }).then(modalres=>{
                    modalres.present();

                    modalres.onDidDismiss().then(res=>{
                      if(res.data!=null){
                        localStorage.removeItem('LocationAddress');
console.log('changed address '+res.data.address);
this.selectedLocation=res.data.address;
this.locality=res.data.locality;

localStorage.setItem('LocationAddress',JSON.stringify(res.data));
this.ionViewWillEnter();
                      }
                      else{
                        console.log('resposnse null');
                      }
                    })
                  })

      }




      Payment(){
        var payableAmountInPaisa=this.totalAmount1*100;
      var  data={
amountInPaisa:payableAmountInPaisa,

        }
        this.cartService.PaymentOrderId(data).subscribe((res)=>{
          console.log(res);
          this.PlaceOrder1(res);

        })
      }

      PlaceOrder1(res){




        var options = {
          "key": "rzp_live_Lr7mSG4IeRtTrk", // Enter the Key ID generated from the Dashboard
          "amount":res.amount , // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          "currency": "INR",
          "name": "TWINKER - ORDER ONLINE",
          "description": "Payable Amount",
          "image": "https://firebasestorage.googleapis.com/v0/b/twinker-70d21.appspot.com/o/512x512.png?alt=media&token=32c59b60-e104-49be-a809-a665fb9bad67",
          "order_id": res.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          "handler": function (response){
              alert(response.razorpay_payment_id);
              alert(response.razorpay_order_id);
              alert(response.razorpay_signature)
          },
          "prefill": {
              "name": "Parthiban Mookkan",
              "email": "parthimk01@gmail.com",
              "contact": "9095924511"
          },
          "notes": {
              "address": "Razorpay Corporate Office"
          },
          "theme": {
              "color": "#ff7f24"
          }
      };


      var rzp1 = new Razorpay(options);


      rzp1.on('payment.failed', function (response){
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
});



rzp1.open();


      }


      RedirectToPayment(){
        this.router.navigate(['payment/'+this.totalAmount1]);
      }

      EditLocation(){
  this.router.navigate(['delivery-location'])

      }

      OpenOffers(){
        this.modalController.create({
          component:OffersPage,
          //componentProps:this.location
                  }).then(modalres=>{
                    modalres.present();

                    modalres.onDidDismiss().then(res=>{

                    })
                  })
      }
      RemoveCoupon(){
        this.ionViewWillEnter();
      }

GetDeliveryBoys(){


  var data1={
    Locality:this.location.locality
    }
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
   ActiveYn:true,
   Locality:this.location.locality

  }

  //  var getAcceptedOrders={
  //    ActiveYn:true,
  //    DeleteYn:false,
  //    UserId:this.user[0]._id,
  //  }

  this.deliveryService.GetOrdersLocality(getOrders).subscribe((res)=>{
    this.orderDetails=res as Orders[];
    console.log("order details "+this.orderDetails[0]);
    // this.orderDetailsFromSocket[0]=this.orderDetails;
    this.orderDetailsFromSocket11[0]=this.orderDetails;


    this.deliveryService.GetDeliveryBoys(data1).subscribe((res)=>{
      this.deliveryBoys=res;
      console.log("dlivery boys "+this.deliveryBoys.length)

      if(this.deliveryBoys.length<=1){
  // this.orderDetailsFromSocket[0]=this.orderDetailsFromSocket1[0];
 // this.orderDetailsFromSocket[0]=this.orderDetailsFromSocket11[0];
   this.deliveryBoyId=this.deliveryBoys[0]._id;
 this.deliveryBoyName=this.deliveryBoys[0].FirstName;
 this.deliveryBoyMobileNo=this.deliveryBoys[0].MobileNo;
 this.deliveryBoyType=this.deliveryBoys[0].UserType;
 this.deliveryBoyImage=this.deliveryBoys[0].ImageUrl;
      }
      else{
        this.a=[];
     //   console.log(this.orderDetailsFromSocket11[0][0].RestaurantName)
  for(var i=0;i<this.deliveryBoys.length;i++){
  for(var j=0;j<this.orderDetailsFromSocket11[0].length;j++){
    if(this.orderDetailsFromSocket11[0][j].DeliveryPartnerStatus=="Accepted by Delivery Partner"){
      console.log("accepted by delivery parterh ");
  if(this.deliveryBoys[i]._id==this.orderDetailsFromSocket11[0][j].DeliveryPartnerDetails.UserId){
    console.log("user id matched "+this.orderDetailsFromSocket11[0][j].DeliveryPartnerDetails.FirstName);
  this.n+=1;

  }
  }

  }
  this.a.push(this.n);
  this.n=0;
  }
  console.log("dafffffffffffffffffffffffffffffffff "+ this.a);
  console.log(this.indexOfSmallest(this.a));

this.deliveryBoyId=this.deliveryBoys[this.indexOfSmallest(this.a)]._id;
this.deliveryBoyName=this.deliveryBoys[this.indexOfSmallest(this.a)].FirstName;
this.deliveryBoyMobileNo=this.deliveryBoys[this.indexOfSmallest(this.a)].MobileNo;
this.deliveryBoyType=this.deliveryBoys[this.indexOfSmallest(this.a)].UserType;
this.deliveryBoyImage=this.deliveryBoys[this.indexOfSmallest(this.a)].ImageUrl;


      }
            })


  })

    }

    indexOfSmallest(a){
      var lowest=0;
      for(var i=1;i<a.length;i++){
        if(a[i]<a[lowest]){
          lowest=i;
        }
      }
      return lowest;
    }
  }



