import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import{RestaurantsService} from 'src/app/restaurants.service';
import{MainMenuService} from 'src/app/main-menu.service';
import MainMenu from '../models/main-menu';
import Restaurants from '../models/restaurants';
import{RestManagmentService} from 'src/app/rest-managment.service';
@Component({
  selector: 'app-admin-rest-management',
  templateUrl: './admin-rest-management.page.html',
  styleUrls: ['./admin-rest-management.page.scss'],
})
export class AdminRestManagementPage implements OnInit {
  selectedValue: string="";
 user:any;
 restaurants:Restaurants[]=[];
shopStatus:String;
isToggle:boolean;
mainMenu:MainMenu[]=[];
  constructor(private router:Router,private restaurantService:RestaurantsService,private mainMenuService:MainMenuService,private restManagementService:RestManagmentService) { }

  selectRestaurants: SelectRestaurants[] = [ ];

  ngOnInit() {
  }

  ionViewWillEnter(){

    this.user = JSON.parse(localStorage.getItem('currentUser') || '{}');

this.GetRestaurants();
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
    this.router.navigate(['menu-status'])

  }

  GetRestaurants(){
    this.restaurantService.GetRestaurants().subscribe((res)=>{


      this.restaurants=res as Restaurants[];


      for(var i=0;i<this.restaurants.length;i++){
        this.selectRestaurants.push({value:this.restaurants[i]._id,viewValue:this.restaurants[i].RestaurantName});
      }






    });
  }



}
interface SelectRestaurants {
  value: string;
  viewValue: string;
}
