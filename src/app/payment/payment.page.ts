
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
import{ProductsService} from 'src/app/products.service';
import MainMenu from '../models/main-menu';
import Product from '../models/products';
import Coupons from '../models/coupons';
import {ActivatedRoute} from '@angular/router';
import {BillDetailsService} from 'src/app/bill-details.service';
import  {SocketService} from '../socket.service';
import { ModalController } from '@ionic/angular';
import { DeliveryCustomisePage } from '../delivery-customise/delivery-customise.page';

declare var Razorpay:any;
@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  paymentType="COD";
totalAmout;
amountInWords;
billDetails;
user;
location;
locality;
showSnipper=false;
  constructor(private socketService:SocketService,private billDetailsService:BillDetailsService,private activateRoute:ActivatedRoute,public modalController: ModalController,private productService:ProductsService, public toastController: ToastController,private alertController:AlertController,private geolocation: Geolocation,private router:Router,private nativeGeocoder:NativeGeocoder,public actionSheetController: ActionSheetController,private cartService:CartService,private registerUserService:RegisterUserService,public loadingController: LoadingController) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.location = JSON.parse(localStorage.getItem('LocationAddress') || '{}');
     this.totalAmout=this.activateRoute.snapshot.params.totalAmount;
    //this.totalAmout=5.00;
    this.billDetails = this.billDetailsService.getExtras();
    console.log("bill details from service "+this.billDetails.MobileNo);

    console.log(this.totalAmout)
    console.log(this.wordify(Math.round(this.totalAmout)));
    this.locality=this.location.locality;
  }

  radioGroupChange(ev){
    console.log("radioGroupChange "+ev.detail.value);
    this.paymentType=ev.detail.value;
  }

  wordify(num) {
    const single = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
    const double = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
    const tens = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    const formatTenth = (digit, prev) => {
       return 0 == digit ? "" : " " + (1 == digit ? double[prev] : tens[digit])
    };
    const formatOther = (digit, next, denom) => {
       return (0 != digit && 1 != next ? " " + single[digit] : "") + (0 != next || digit > 0 ? " " + denom : "")
    };
    let res = "";
    let index = 0;
    let digit = 0;
    let next = 0;
    let words = [];
    if (num += "", isNaN(parseInt(num))){
       res = "";
    }
    else if (parseInt(num) > 0 && num.length <= 10) {
       for (index = num.length - 1; index >= 0; index--) switch (digit = num[index] - 0, next = index > 0 ? num[index - 1] - 0 : 0, num.length - index - 1) {
          case 0:
             words.push(formatOther(digit, next, ""));
          break;
          case 1:
             words.push(formatTenth(digit, num[index + 1]));
             break;
          case 2:
             words.push(0 != digit ? " " + single[digit] + " Hundred" + (0 != num[index + 1] && 0 != num[index + 2] ? " and" : "") : "");
             break;
          case 3:
             words.push(formatOther(digit, next, "Thousand"));
             break;
          case 4:
             words.push(formatTenth(digit, num[index + 1]));
             break;
          case 5:
             words.push(formatOther(digit, next, "Lakh"));
             break;
          case 6:
             words.push(formatTenth(digit, num[index + 1]));
             break;
          case 7:
             words.push(formatOther(digit, next, "Crore"));
             break;
          case 8:
             words.push(formatTenth(digit, num[index + 1]));
             break;
          case 9:
             words.push(0 != digit ? " " + single[digit] + " Hundred" + (0 != num[index + 1] || 0 != num[index + 2] ? " and" : " Crore") : "")
       };
       res = words.reverse().join("")
    } else res = "";
    this.amountInWords=res;
    return res

 }



 Payment(){

if(this.paymentType=="PG"){
  this.showSnipper=true;



  var payableAmountInPaisa=this.totalAmout*100;
var  data={
amountInPaisa:payableAmountInPaisa,

  }
  this.cartService.PaymentOrderId(data).subscribe((res)=>{
    console.log(res);
    this.showSnipper=false;
    this.PlaceOrder1(res);

  })
}
else{
  this.showSnipper=true;
  this.billDetails.PaymentDetails.PaymentType="COD";
  this.billDetails.PaymentDetails.Status="Pending";
  this.billDetails.PaymentDetails.RazorpayPaymentId="None";
  this.billDetails.PaymentDetails.RazorpayOrderId="None";
  this.billDetails.PaymentDetails.RazorPaySignature="None";
  console.log(JSON.stringify(this.billDetails));
  var updateCartPlaced={
    Status:'Placed',
    ActiveYn:true,
    DeleteYn:false,
    UserId:this.user[0]._id,

   }


   this.cartService.OrderDetails(this.billDetails).subscribe((res)=>{
    // socket.emit('orderPlaced',"orderPlaced successful");

    this.cartService.UpdateCartPlaced(updateCartPlaced).subscribe((res)=>{

     })
     this.showSnipper=false;
this.presentAlertConfirm();
var data={
  room:this.locality,
  user:'user'
}
this.socketService.OrderPlaced(data);

 })
}
}

PlaceOrder1(res){

  // this.billDetails.PaymentDetails.PaymentType="PG";
  // this.billDetails.PaymentDetails.Status="Pending";
  // this.billDetails.PaymentDetails.RazorpayPaymentId="None";
  // this.billDetails.PaymentDetails.RazorpayOrderId="None";
  // this.billDetails.PaymentDetails.RazorPaySignature="None";
  // this.billDetails.PaymentDetails.PaymentType="PG";
  //     this.billDetails.PaymentDetails.Status="Success";
  //     this.billDetails.PaymentDetails.RazorpayPaymentId=response.razorpay_payment_id;
  //     this.billDetails.PaymentDetails.RazorpayOrderId=response.razorpay_order_id;
  //     this.billDetails.PaymentDetails.RazorPaySignature=response.razorpay_signature;

  var options = {
    "key": "rzp_live_Lr7mSG4IeRtTrk", // Enter the Key ID generated from the Dashboard
    "amount":res.amount , // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "TWINKER",
    "description": "Payable Amount",
    "image": "https://firebasestorage.googleapis.com/v0/b/twinker-70d21.appspot.com/o/logo.png?alt=media&token=95e046de-463d-4271-8f78-68dfc4be67e0",
    "order_id": res.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "prefill": {
      "name": this.billDetails.UserNmae,
      "email": "",
      "contact": this.billDetails.MobileNo,
  },
    "theme": {
        "color": "#f7714a"
    }
};

var successCallback = function(success) {
  alert('payment_id: ' + success.razorpay_payment_id)
  var orderId = success.razorpay_order_id
  var signature = success.razorpay_signature


  }
  var cancelCallback = function(error) {
  alert(error.description + ' (Error '+error.code+')')
  }

var rzp1 = new Razorpay(options);


rzp1.on('payment.failed', function (response){
  console.log("payment failure");
  console.log(response.error.code);
  console.log(response.error.description);
  console.log(response.error.source);
  console.log(response.error.step);
  console.log(response.error.reason);
  console.log(response.error.metadata.order_id);
  console.log(response.error.metadata.payment_id);

});

// rzp1.on('payment.success',function(response){
//   console.log("payment success "+response.success.status);
// })



rzp1.open();

rzp1.on('payment.success', successCallback)
rzp1.on('payment.cancel', cancelCallback)

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

RedirectToHome(){
  this.router.navigate(['cart']);
}

}
