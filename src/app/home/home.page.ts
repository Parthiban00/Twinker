import { Component } from '@angular/core';

import {Router,ActivatedRoute} from '@angular/router';
import{RestaurantsService} from 'src/app/restaurants.service';
import Restaurant from '../models/restaurants';
import{CartService} from 'src/app/cart.service';
import Cart from '../models/cart';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  userName:string="";
  userId:string="";
  currentRate:number=3;
restaurantDetails:Restaurant[]=[];
user = JSON.parse(localStorage.getItem('currentUser') || '{}');
  /*restaurantDetails=[
    {
      id:"1",
       name:"Swathi Mess",
     status:"Available",
     type:"Veg/Non-Veg",
     address:"Court vaasal, Sivaganga.",
     ratting:"4.5"

   },

   {
    id:"2",
    name:"Malairam Restaurant",
   status:"Available",
   type:"Veg/Non-Veg",
   address:"Near Sivankovil, Sivaganga.",
   ratting:"3.0"
 },
   ];*/



   images=['assets/images/food_delivery.3jpg.jpg','assets/images/food_delivery4.jpg','assets/images/food_delivery2.jpg']
  constructor(private router:Router,private activatedRouter:ActivatedRoute,private restaurantService:RestaurantsService,private cartService:CartService) {


  }
  cartItemsAll:Cart[]=[];

   itemTotal=0;
   restaurantName:string="";
   lat1=9.9192509;
   lon1=78.1083096;
   lat2=9.9153631;
   lon2=78.4441528;
   unit="K";
   coord:any;
  ngOnInit(): void {

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


    this.userName=this.activatedRouter.snapshot.params.firstName;
    this.userId=this.activatedRouter.snapshot.params.id;
    this.restaurantService.GetRestaurants().subscribe((res)=>{

      this.restaurantDetails=res as Restaurant[];
      //console.log(this.restaurants[0].RestaurantName);
      if(!navigator.geolocation){
        console.log('location not supported');
      }

      navigator.geolocation.getCurrentPosition((position:any)=>{
       this. coord=position.coords;

        console.log(`lat: ${position.coords.latitude},lon:${position.coords.longitude}`);


        for(var j=0;j<this.restaurantDetails.length;j++){


          console.log("enters for loop");
      k=j;
          this.distance(this.coord.latitude,this.coord.longitude,this.restaurantDetails[j].Latitude,this.restaurantDetails[j].Longitude,this.unit,k);
        }
      });


    });


  }

  viewCart(){
    this.router.navigate(['cart-items']);
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
      }
      if (unit=="N") { dist = dist * 0.8684 }
      return dist;
    }
  }

  RestaurntClick(restaurantName:String,restaurantId:any){
    console.log(restaurantName);
   this.router.navigate(['product-page/'+restaurantName+'/'+restaurantId]);
  }

}
