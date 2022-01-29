import { Component, OnInit } from '@angular/core';
import {ChangeLocationPage} from '../change-location/change-location.page';
import {BuddyShopService} from 'src/app/buddy-shop.service';
import { AlertController, ModalController } from '@ionic/angular';
import { stringify } from 'querystring';
import {BuddyService} from 'src/app/buddy.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-buddy-items',
  templateUrl: './buddy-items.page.html',
  styleUrls: ['./buddy-items.page.scss'],
})
export class BuddyItemsPage implements OnInit {
  values=[{}];
  hideRemoveBtn=true;
  buddyitems:any;
  shopName;
  shopCategory;
  shopLocation;
  user;
  location;
  buddyOrderDetails=[];
  public items: any[] = [{
    id: 1,
    item: '',
  }];
  constructor(private router:Router,private alertController:AlertController,private buddyShopService:BuddyShopService,public modalController: ModalController,private buddyService:BuddyService) { }

  ngOnInit() {
  }
  removeValue(i){
    console.log(this.items.length);

    if(this.items.length==1){

    }
    else if(this.items.length==2){
      this.hideRemoveBtn=true;
    this.items.splice(i,1);
    }
    else{
      this.items.splice(i,1);
    }
  }
  addValue(){

    this.hideRemoveBtn=false;

    this.items.push({
      id: this.items.length + 1,
    item:''
    });

  }

  logValue() {
    console.log(typeof(this.items));
this.buddyOrderDetails.push(this.items);
console.log("buddy order details "+typeof( this.buddyOrderDetails));

var orderDetails={
  OrderDetails:this.buddyOrderDetails,
  Status:'Submitted',
  BuddyStatus:'Submitted by Customer',
  Locality:this.location.locality,
  UserDetails:this.user[0]
}

this.buddyService.SaveBuddyOrders(orderDetails).subscribe((res)=>{
  console.log('saved success');
  this.presentAlertConfirm();
})

  }


  ionViewWillEnter(){
    this.user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.location = JSON.parse(localStorage.getItem('LocationAddress') || '{}');
    this.buddyitems = this.buddyShopService.getBuddy();
    this.buddyOrderDetails.push(this.buddyitems);
    console.log(this.buddyitems.shopName);
this.shopName=this.buddyitems.shopName;
this.shopCategory=this.buddyitems.shopCategory;
this.shopLocation=this.buddyitems.shopLocation;
  }

  async presentAlertConfirmtToPlace() {


   const alert = await this.alertController.create({
     cssClass: 'my-custom-class',
     header: 'Confirm Submit...',
     message: 'We will assign a buddy for you, and they will contact you within 10 mins...',
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

         text: 'Ok to Submit',
         handler: () => {

       this.logValue();



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

RedirectToBuddy(){
  this.router.navigate(['buddy']);
}
}
