import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import{RestaurantsService} from 'src/app/restaurants.service';
import{MainMenuService} from 'src/app/main-menu.service';
import MainMenu from '../models/main-menu';
import Restaurants from '../models/restaurants';
import{RestManagmentService} from 'src/app/rest-managment.service';
import Locality from '../models/locality';
import{GeocodingService} from 'src/app/geocoding.service';
import { ToastController } from '@ionic/angular';
import { RestaurantOwnerDashboardPageModule } from '../restaurant-owner-dashboard/restaurant-owner-dashboard.module';
@Component({
  selector: 'app-owner-rest-management',
  templateUrl: './owner-rest-management.page.html',
  styleUrls: ['./owner-rest-management.page.scss'],
})
export class OwnerRestManagementPage implements OnInit {
  selectedValue: string="";
  user:any;
  restaurants:Restaurants[]=[];
 shopStatus:String;
 isToggle:boolean;
 mainMenu:MainMenu[]=[];
 locality:Locality[];
   constructor(public toastController: ToastController,private geoCodingService:GeocodingService,private router:Router,private restaurantService:RestaurantsService,private mainMenuService:MainMenuService,private restManagementService:RestManagmentService) { }

   selectRestaurants: SelectRestaurants[] = [ ];

   ngOnInit() {
   }

   ionViewWillEnter(){

     this.user = JSON.parse(localStorage.getItem('currentUser') || '{}');

 this.GetRestaurants();

 this.geoCodingService.GetLocality().subscribe((res)=>{
  this.locality=res as Locality[];
  console.log("locality   "+this.locality)


})
   }

   RedirectToHome(){
     this.router.navigate(['admin-dashboard']);
   }

   onChange(selectedValue){
 console.log("restaurant id "+selectedValue);

 for(var i=0;i<this.restaurants.length;i++){
   if(selectedValue==this.restaurants[i]._id){
     if(this.restaurants[i].AvailableStatus){
       this.shopStatus="Opened";
       break;
     }
     else{
 this.shopStatus="Closed";
     }

   }
 }



 this.mainMenuService.GetMainMenu(selectedValue).subscribe((res)=>{
   this.mainMenu = res as MainMenu[];
   console.log(this.mainMenu);

   //this.menu=this.mainMenu[0]._id;

   // this.productService.GetProducts(this.restaurantId).subscribe((res)=>{
   // this.productDetails=res as Product[];
   // this.searchedItem=res as Product[];
   // console.log(this.productDetails);

   // for(var i=0;i<this.productDetails.length;i++){

   //   if(this.mainMenu[0]._id==this.productDetails[i].MenuId){
   //     this.products.push(this.productDetails[i]);
   //   }
   // }








   // })




     });







   }

   onChange1(selectedValue){

   }

   ToggleEvent(event:any,id:any){
     console.log("toggle event entered");
     console.log(event);
     //this.isToggle=event.detail.checked;

     if(event){
       var data={
         _id:id,
         availableStatus:true
       }
       this.restManagementService.UpdateRestaurantStatus(data).subscribe((res)=>{
        this.GetRestaurants();
       },err=>{console.log("error"+err)},()=>console.log("process completed"))

     }

     else{
       var data={
         _id:id,
         availableStatus:false
       }
       this.restManagementService.UpdateRestaurantStatus(data).subscribe((res)=>{
         this.GetRestaurants();
       },err=>{console.log("error"+err)},()=>console.log("process completed"))

     }
   }


   OpenAll(){
    var data={
 availableStatus:true
     }

     this.restManagementService.UpdateAllRest(data).subscribe((res)=>{
 this.ionViewWillEnter();
     },err=>{

       console.log("error "+err)
     },()=>console.log("proecss completed"))

   }
   CloseAll(){
     var data={
       availableStatus:false
     }
     this.restManagementService.UpdateAllRest(data).subscribe((res)=>{
       this.ionViewWillEnter();
     },err=>{

       console.log("error "+err)
     },()=>console.log("proecss completed"))

   }

   ManageMenus(){
     this.router.navigate(['owner-menus-management'])

   }

   GetRestaurants(){
var data={
  UserId:this.user[0]._id,
  ActiveYn:true,
  DeleteYn:false
}

     this.restaurantService.GetOwnersRestaurant(data).subscribe((res)=>{


       this.restaurants=res as Restaurants[];
this.selectedValue=this.restaurants[0].Locality
console.log(this.selectedValue);

       for(var i=0;i<this.restaurants.length;i++){
         this.selectRestaurants.push({value:this.restaurants[i]._id,viewValue:this.restaurants[i].RestaurantName});
       }






     });
   }

   UpdateRestaurant(formDetails){
     console.log(formDetails.form.value);
     var data={
id:this.restaurants[0]._id,
    RestaurantName:formDetails.form.value.restname,
    Address:formDetails.form.value.address,
    MobileNo:formDetails.form.value.mobileno,
    RestaurantType:formDetails.form.value.resttype,
    RestaurantStatus:'Available',
    OrderStatus:true,
    DineinStatus:true,
    AvailableDays:'Sun-Mon',
    UserType:'R',
    ActiveYn:true,
    DeleteYn:false,

    Offer:false,
    AvailableStatus: this.restaurants[0].AvailableStatus,
    OfferDescriptoin:'No',
    UserId: this.user[0]._id,
    Type:this.restaurants[0].Type,
    Charges:this.restaurants[0].Charges,
    ImageUrl:this.restaurants[0].ImageUrl,
    Category:this.restaurants[0].Category,
    CategoryId:this.restaurants[0].CategoryId,
    Locality:this.restaurants[0].Locality,
    Description:formDetails.form.value.description,
    OverallRating:this.restaurants[0].OverallRating,
    DeliveryTime:this.restaurants[0].DeliveryTime
     }
this.restManagementService.UpdateRestaurantDetails(data).subscribe((res)=>
{
  this.presentToast('Restaurant Details Updated Successfully...');
  this.GetRestaurants();
},err=>{

       console.log("error "+err)
     },()=>console.log("proecss completed"))

   }

   async presentToast(message:any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}
interface SelectRestaurants {
  value: string;
  viewValue: string;
}
