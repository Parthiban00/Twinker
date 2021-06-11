import { Component } from '@angular/core';

import {Router,ActivatedRoute} from '@angular/router';
import{RestaurantsService} from 'src/app/restaurants.service';
import Restaurant from '../models/restaurants';
import{CartService} from 'src/app/cart.service';
import Cart from '../models/cart';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

getData:any;
  userName:string="";
  userId:string="";
  currentRate:number=3;
  isLoading = false;
restaurantDetails:Restaurant[]=[];
user = JSON.parse(localStorage.getItem('currentUser') || '{}');



   images=['assets/images/food_delivery.3jpg.jpg','assets/images/food_delivery4.jpg','assets/images/food_delivery2.jpg']
  constructor(private router:Router,private activatedRouter:ActivatedRoute,private restaurantService:RestaurantsService,private cartService:CartService,public loadingController: LoadingController) {


//this.dismiss();


  }




  cartItemsAll:Cart[]=[];

   itemTotal=0;
   restaurantName:string="";
  //  lat1=9.9192509;
  //  lon1=78.1083096;
  //  lat2=9.9153631;
  //  lon2=78.4441528;
   unit="K";
   coord:any;
  ngOnInit(): void {

    this.present();

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

        console.log(` current lat: ${position.coords.latitude}, current lon:${position.coords.longitude}`);


        for(var j=0;j<this.restaurantDetails.length;j++){


          console.log("enters for loop");
      k=j;
          this.distance(this.coord.latitude,this.coord.longitude,this.restaurantDetails[j].Latitude,this.restaurantDetails[j].Longitude,this.unit,k);
        }
        this.dismiss();
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



  doRefresh(event) {
    this.ngOnInit();



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

}


