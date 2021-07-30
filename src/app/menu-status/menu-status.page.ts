import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import{RestaurantsService} from 'src/app/restaurants.service';
import{MainMenuService} from 'src/app/main-menu.service';
import MainMenu from '../models/main-menu';
import Restaurants from '../models/restaurants';
import{RestManagmentService} from 'src/app/rest-managment.service';
import{ProductsService} from 'src/app/products.service';

import Product from '../models/products';
@Component({
  selector: 'app-menu-status',
  templateUrl: './menu-status.page.html',
  styleUrls: ['./menu-status.page.scss'],
})
export class MenuStatusPage implements OnInit {
  selectedValue: string="";
 user:any;
 restaurants:Restaurants[]=[];
shopStatus:String;
isToggle:boolean;
mainMenu:MainMenu[]=[];
selectRestaurants: SelectRestaurants[] = [ ];
productDetails:Product[]=[];
products:Product[]=[];
menuId:string;
productFrom:string;
  constructor(private productService:ProductsService,private router:Router,private restaurantService:RestaurantsService,private mainMenuService:MainMenuService,private restManagementService:RestManagmentService) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.user = JSON.parse(localStorage.getItem('currentUser') || '{}');

    this.GetRestaurants();
  }
  RedirectToHome(){
    this.router.navigate(['admin-dashboard']);
  }


  GetRestaurants(){
    this.restaurantService.GetRestaurants().subscribe((res)=>{


      this.restaurants=res as Restaurants[];


      for(var i=0;i<this.restaurants.length;i++){
        this.selectRestaurants.push({value:this.restaurants[i]._id,viewValue:this.restaurants[i].RestaurantName});
      }






    });
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

      GetProducts(id:string,menuName:string){
        console.log(id);
        this.productFrom=menuName;
        this.menuId=id;
        this.products=[];
        this.productDetails=[];
        this.productService.GetProducts(this.selectedValue).subscribe((res)=>{
          this.productDetails=res as Product[];

          console.log(this.productDetails);

          for(var i=0;i<this.productDetails.length;i++){
if(id==this.productDetails[i].MenuId){
this.products.push(this.productDetails[i]);
}

          }
          this.productDetails=this.products;









          })
      }

      ToggleEvent(event:any,id:any){
if(event){
  var data={
restId:this.selectedValue,
menuId:id,
availableStatus:true
  }
  this.restManagementService.UpdateProductStatus(data).subscribe((res)=>{
this.GetProducts(this.menuId,this.productFrom);
  },err=>{console.log("error"+err)},()=>console.log("process completed"))
}
else{
  var data={
    restId:this.selectedValue,
    menuId:id,
    availableStatus:false
      }
      this.restManagementService.UpdateProductStatus(data).subscribe((res)=>{
        this.GetProducts(this.menuId,this.productFrom);
      },err=>{console.log("error"+err)},()=>console.log("process completed"))

}
      }



      ToggleEvent1(event:any,id:any){

        if(event){
          var data={
        restId:this.selectedValue,
        id:id,
        menuId:this.menuId,
        availableStatus:true
          }

          this.restManagementService.UpdateOneProductStatus(data).subscribe((res)=>{

          },err=>{console.log("error"+err)},()=>console.log("process completd"))
        }
        else{
          var data={
            restId:this.selectedValue,
            id:id,
            menuId:this.menuId,
            availableStatus:false
              }
              this.restManagementService.UpdateOneProductStatus(data).subscribe((res)=>{

              },err=>{console.log("error"+err)},()=>console.log("process completd"))

        }
      }

}
interface SelectRestaurants {
  value: string;
  viewValue: string;
}
