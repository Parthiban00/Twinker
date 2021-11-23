import { Component , ViewChild, OnInit,OnDestroy, HostListener, ElementRef} from '@angular/core';
import { ToastController,IonContent } from '@ionic/angular';
import {Router,ActivatedRoute} from '@angular/router';
import{RestaurantsService} from 'src/app/restaurants.service';
import Restaurant from '../models/restaurants';
import{CartService} from 'src/app/cart.service';
import Cart from '../models/cart';
import { LoadingController } from '@ionic/angular';
import { IonSearchbar,IonSelect,IonList} from '@ionic/angular';
import Category from '../models/category';
import{CategoriesService} from 'src/app/categories.service';
import * as moment from 'moment';
import ShopCategory from '../models/shop-category';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../popover/popover.component';
import{PopoverTypesPage} from '../popover-types/popover-types.page';
import { PopoverTypesPageRoutingModule } from '../popover-types/popover-types-routing.module';
import { ViewportScroller } from '@angular/common';
import {StatusBar} from "@capacitor/status-bar"
import { Content } from '@angular/compiler/src/render3/r3_ast';
//import io from 'socket.io-client';

//const socket=io("http://localhost:5000");


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('search', { static: false }) search: IonSearchbar;
  @ViewChild('mySelect', { static: false }) selectRef: IonSelect;
  //@ViewChild(IonList,{read:ElementRef}) lists:ElementRef;
  @ViewChild(IonList) lists: IonList;
//@ViewChild(IonContent,{static:true})
//content:IonContent
@ViewChild(IonContent) content: IonContent;
colorCodes:any[]=[{name:"red",code:"fb5b5b"},{name:"green",code:""}]

  public list: Array<Object> = [];
  searchedItem=[];
  //SortedArray=[];
  searchedItem1:any;
toastMsg="";
  searchHotel:any;
getData:any;
  userName:string="";
  userId:string="";
  currentRate:number=3;
  isLoading = false;
restaurantDetails:Restaurant[]=[];
isToggle:boolean;
category:Category[];
location;
cartItemsAll:Cart[]=[];
shopCategory:ShopCategory[];
itemTotal=0;
restaurantName:string="";
selected;
unit="K";
coord:any;
user:any;
type:string;
currentTime1;
skeleton=[

{},
{},
{},
{},
{},
{},
{},
{},
{},
{},
{},
]


   images=['assets/images/food_delivery.3jpg.jpg','assets/images/food_delivery4.jpg','assets/images/food_delivery2.jpg']
  constructor(private _vps: ViewportScroller,public popoverController: PopoverController,private categoriesService:CategoriesService,private router:Router,private activatedRouter:ActivatedRoute,private restaurantService:RestaurantsService,private cartService:CartService,public loadingController: LoadingController,public toastController: ToastController) {




  }


  ngOnInit(): void {

// socket.emit('message',"He i am socker");
  }

  openSelect() {
    this.selectRef.open()
  }

  ionViewWillEnter(){
    this.user=JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.location=JSON.parse(localStorage.getItem('LocationAddress') || '{}');
StatusBar.setBackgroundColor({color:'fb5b5b'});
   // this.dismiss();

   this.searchedItem=[];
    //this.present();
   const m=moment();
   console.log(m.toString());


    this.type=this.activatedRouter.snapshot.params.type;
    console.log(this.type);

    // navigator.geolocation.getCurrentPosition((position:any)=>{

    //   this. coord=position.coords;


    //  });


     var data={
      Type:this.type,
      ActiveYn:true
    }

    this.categoriesService.GetCategory(data).subscribe((res)=>{
     this.category=res as Category[];
     //console.log("categories "+this.category);

    })


this.searchHotel="";

    var k;



    var getCart={
      UserId:this.user[0]._id,
      Status:"Cart",
      ActiveYn:true,
      DeleteYn:false
    }
    this.cartService.GetCartAll(getCart).subscribe((res)=>{
      this.cartItemsAll=res as Cart[];
      console.log(this.cartItemsAll);

      for(var i=0;i<this.cartItemsAll.length;i++){
       this.itemTotal+=this.cartItemsAll[i].Amount;
        this.restaurantName=this.cartItemsAll[i].RestaurantName;
        }

    })

var getRest={
ActiveYn:true,
Type:this.type
}
this.restaurantService.GetCategory(getRest).subscribe((res)=>{
  this.shopCategory=res as ShopCategory[];
  console.log("shop category length "+this.shopCategory.length)
})

    this.restaurantService.GetRestaurants1(getRest).subscribe((res)=>{


      this.restaurantDetails=res as Restaurant[];
      this.searchedItem1 = res as Restaurant[];
      //this.searchedItem = res as Restaurant[];
     // var sortedArray: number[] = restaurantDetails.sort((n1,n2) => n1 - n2);


      this.dismiss();

      this.list=[];
      for(var j=0;j<this.restaurantDetails.length;j++){
       // this.shopCategory.push(this.restaurantDetails[j].Category);

        this.list.push(this.restaurantDetails[j]);
                  // console.log("enters for loop");
              k=j;
//console.log('dsaffffffffffffffffffffffffff'+this.restaurantDetails[j].OpenTime);
                  this.distance(this.location.lat,this.location.lon,this.restaurantDetails[j].Latitude,this.restaurantDetails[j].Longitude,this.unit,k);
//this.AvailableTime(this.restaurantDetails[j].OpenTime,this.restaurantDetails[j].CloseTime,k);

                }

               this.searchedItem1.sort((a, b) => {
                  return a.Distance - b.Distance;
              });
              this.searchedItem1.forEach((e) => {
                console.log(`${e.RestaurantName}  ${e.Distance}`);
                this.searchedItem.push(e);
            });
    });


    }


  viewCart(){
    this.router.navigate(['cart']);
  }


  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
       // console.log(currentUrl);
    });
  }

  distance(lat1:any, lon1:any, lat2:any, lon2:any, unit:any,k:any) {

    console.log(k);
    if ((lat1 == lat2) && (lon1 == lon2)) {
      return 0;
    }
    else {

      var radlat1 = Math.PI * lat1/180;
      var radlat2 = Math.PI * lat2/180;
      var theta = lon1-lon2;
      var radtheta = Math.PI * theta/180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit=="K") { dist = dist * 1.609344
      // console.log("distance between two coord   "+dist)
      this.restaurantDetails[k].Distance=parseFloat(dist.toFixed(1));
//this.dismiss();
      }
      if (unit=="N") { dist = dist * 0.8684 }
      return dist;
    }
  }

  RestaurntClick(restaurantName:String,restaurantId:any,status:boolean){
    console.log(restaurantName+''+status);

   if(status){
    this.router.navigate(['product-page/'+restaurantName+'/'+restaurantId+'/'+this.type]);
   }
   else{

   }

  }



  doRefresh(event) {
    //this.ngOnInit();
    this.ionViewWillEnter();



    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, );
  }

  RedirectToHome(){
    this.router.navigate(['home-page']);
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
    this.searchedItem = this.restaurantDetails;
    console.log("rest details"+this.restaurantDetails);
    const val = event.target.value;
    if (val && val.trim() != '') {
      this.searchedItem = this.searchedItem.filter((item: any) => {
        console.log(item.RestaurantName.toLowerCase().indexOf(val.toLowerCase()) > -1);
        return (item.RestaurantName.toLowerCase().indexOf(val.toLowerCase()) > -1);

      })
    }

  }



  async presentToast(status:any) {
    const toast = await this.toastController.create({
      message: status,
      duration: 1000
    });
    toast.present();
  }


  option={
    slidePerView:'auto',

    zoom:false,
    grabCursor:true
  }


ToggleEvent(event:any){

  this.searchedItem=[]
  this.list=[];
  var k;
  console.log("event "+event);
  console.log("istoggle "+this.isToggle);
  if(this.isToggle==true){
   // this.present();


    for(var j=0;j<this.restaurantDetails.length;j++){

if(this.restaurantDetails[j].RestaurantType=='Veg'){
  this.list.push(this.restaurantDetails[j]);

k=j;

 // this.distance(this.coord.latitude,this.coord.longitude,this.restaurantDetails[j].Latitude,this.restaurantDetails[j].Longitude,this.unit,k);


}




              }
              this.searchedItem=this.list;
             // this.dismiss();

  }
  else {

    this.ionViewWillEnter();

  }
}

// Products(category:any){

//   this.router.navigate(['products/'+category+'/'+this.type]);
// }

Products(restaurantName:string,restaurantId:string,type:string){
  this.router.navigate(['product-page/'+restaurantName+'/'+restaurantId+'/'+type]);

   //this.router.navigate(['products/'+category+'/'+this.type]);
  }

async presentPopover(ev: any) {
  const popover = await this.popoverController.create({
    component: PopoverTypesPage,
    cssClass: 'my-custom-class',
    event: ev,
    translucent: true,
    componentProps:this.shopCategory
  });

  popover.onDidDismiss().then((data:any)=>{
console.log("from popover data  "+data.data.fromPopover);
this.scrollFn(data.data.fromPopover);
  })
  await popover.present();

  const { role } = await popover.onDidDismiss();
  console.log('onDidDismiss resolved with role', role);
}


AvailableTime(stime,etime,k){
  console.log(stime,etime);
     // ------------------------------------------------------------------------------getTIme start-----------------
     var d = new Date(); // for now
     d.getHours(); // => 9
     d.getMinutes(); // =>  30
     d.getSeconds(); // => 51
     var time=d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();
 // ------------------------------------------------------------------------------------getTime end---------------

 var currentDateTime=time;

 // console.log('current date and time '+currentDateTime);


//  stime='11:00a';
//   etime='3.00p';

 var startTime = moment(stime, "HH:mm a");
 var endTime = moment(etime, "HH:mm a");
  startTime.toString();   // "Fri Oct 28 2016 18:00:00 GMT-0400"
 endTime.toString();    // "Fri Oct 28 2016 03:30:00 GMT-0400"
 this. currentTime1=moment(currentDateTime,"HH:mm:ss")
 //currentTime.toString(); //"Fri Oct 28 2016 23:00:00 GMT-0400"
 //console.log(this.currentTime1.toString());

 if(this.currentTime1.isAfter(startTime) && this.currentTime1.isBefore(endTime)){
   console.log("tttttrue");
   this.restaurantDetails[k].AvailableStatus=true;
   }
   else{
     console.log("ffffalse");
     this.restaurantDetails[k].AvailableStatus=false;
   }
}

scrollFn(anchor: string): void{
  console.log("hi scroll"+anchor);
//   this._vps.scrollToAnchor(anchor);
// let arr=this.lists.nativeElement.children;
// let item=arr[anchor];
// item.scrollIntoView({behaviour:'smooth',block:'start'});
  //this.content.scrollX(0, , 4000)
  let y = document.getElementById(anchor).offsetTop;
        this.content.scrollToPoint(0,y,1000);

}


}


