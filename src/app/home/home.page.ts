import { Component , ViewChild, OnInit,OnDestroy, HostListener} from '@angular/core';
import { ToastController } from '@ionic/angular';
import {Router,ActivatedRoute} from '@angular/router';
import{RestaurantsService} from 'src/app/restaurants.service';
import Restaurant from '../models/restaurants';
import{CartService} from 'src/app/cart.service';
import Cart from '../models/cart';
import { LoadingController } from '@ionic/angular';
import { IonSearchbar } from '@ionic/angular';
import Category from '../models/category';
import{CategoriesService} from 'src/app/categories.service';
import * as moment from 'moment';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('search', { static: false }) search: IonSearchbar;

  public list: Array<Object> = [];
  searchedItem: any;
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

itemTotal=0;
restaurantName:string="";

unit="K";
coord:any;
user:any;
type:string;
skeleton=[

{},
{},
{},
{}
]


   images=['assets/images/food_delivery.3jpg.jpg','assets/images/food_delivery4.jpg','assets/images/food_delivery2.jpg']
  constructor(private categoriesService:CategoriesService,private router:Router,private activatedRouter:ActivatedRoute,private restaurantService:RestaurantsService,private cartService:CartService,public loadingController: LoadingController,public toastController: ToastController) {




  }


  ngOnInit(): void {


  }

  ionViewWillEnter(){
    this.user=JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.location=JSON.parse(localStorage.getItem('LocationAddress') || '{}');

   // this.dismiss();


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
     console.log("categories "+this.category);

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


    this.restaurantService.GetRestaurants1(getRest).subscribe((res)=>{


      this.restaurantDetails=res as Restaurant[];
      this.searchedItem = res as Restaurant[];
      this.dismiss();

      this.list=[];
      for(var j=0;j<this.restaurantDetails.length;j++){


        this.list.push(this.restaurantDetails[j]);
                  console.log("enters for loop");
              k=j;

                  this.distance(this.location.lat,this.location.lon,this.restaurantDetails[j].Latitude,this.restaurantDetails[j].Longitude,this.unit,k);

                }






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
      console.log("distance between two coord   "+dist)
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

Products(category:any){

  this.router.navigate(['products/'+category+'/'+this.type]);
}

}


