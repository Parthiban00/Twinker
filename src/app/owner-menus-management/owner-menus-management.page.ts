import { Component, OnInit, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import{RestaurantsService} from 'src/app/restaurants.service';
import{MainMenuService} from 'src/app/main-menu.service';
import MainMenu from '../models/main-menu';
import Restaurants from '../models/restaurants';
import{RestManagmentService} from 'src/app/rest-managment.service';
import{ProductsService} from 'src/app/products.service';
import Product from '../models/products';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import {OwnersService} from 'src/app/owners.service';
@Component({
  selector: 'app-owner-menus-management',
  templateUrl: './owner-menus-management.page.html',
  styleUrls: ['./owner-menus-management.page.scss'],
})
export class OwnerMenusManagementPage implements OnInit {
  @ViewChild('content') private content: any;

  selectedValue: string="";
  addMenu=false;
  addSubMenuRecommended=false
  addSubMenuSuggestion=false
  user:any;
  restaurants:Restaurants[]=[];
 shopStatus:String;
 isToggle:boolean;
 mainMenu:MainMenu[]=[];
 selectRestaurants: SelectRestaurants[] = [ ];
 productDetails:Product[]=[];
 products:Product[]=[];
 menuId:string;
 viewType;
 showMainMenuAdd=false;
role="Edit";
 showSumenu=false;
 AddBtn=false;
 showMenuStatus=false;
 productFrom:string;
 restId;
 image:any;
 uploadBtn=true;
 menuImageUrl="";

   constructor(private alertController:AlertController,private ownersService:OwnersService ,public toastController: ToastController,private productService:ProductsService,private router:Router,private restaurantService:RestaurantsService,private mainMenuService:MainMenuService,private restManagementService:RestManagmentService) { }

   ngOnInit() {
   }

   ionViewWillEnter(){
     this.user = JSON.parse(localStorage.getItem('currentUser') || '{}');

     this.GetRestaurants();
   }
   RedirectToHome(){
     this.router.navigate(['owner-rest-management']);
   }


   GetRestaurants(){
    var data={
      UserId:this.user[0]._id,
      ActiveYn:true,
      DeleteYn:false
    }

         this.restaurantService.GetOwnersRestaurant(data).subscribe((res)=>{


       this.restaurants=res as Restaurants[];


       for(var i=0;i<this.restaurants.length;i++){
         this.selectRestaurants.push({value:this.restaurants[i]._id,viewValue:this.restaurants[i].RestaurantName});
       }






     });
   }


   onChange(selectedValue){
 this.showMenuStatus=true;

     console.log("restaurant id "+selectedValue);
this.restId=selectedValue;
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

       GetProducts(id:string,menuName:string,viewType:string){
this.addMenu=false;
this.showMainMenuAdd=false;
        this.showSumenu=true;
        this.role="Edit";
         console.log(id);
         this.productFrom=menuName;
         this.viewType=viewType;
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
 this.GetProducts(this.menuId,this.productFrom,this.viewType);
   },err=>{console.log("error"+err)},()=>console.log("process completed"))
 }
 else{
   var data={
     restId:this.selectedValue,
     menuId:id,
     availableStatus:false
       }
       this.restManagementService.UpdateProductStatus(data).subscribe((res)=>{
         this.GetProducts(this.menuId,this.productFrom,this.viewType);
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

       UpdateMenu(loginForm:any,_id){
         console.log(loginForm.form.value);
         console.log("product Id "+_id)

         var data={
           _id:_id,
           ProductName:loginForm.form.value.productname,
           Description:loginForm.form.value.productdescription,
           Price:loginForm.form.value.productprice,
           Suggestion:loginForm.form.value.suggestion,
           Recommended:loginForm.form.value.recommended
         }

         this.productService.UpdateProduct(data).subscribe((res)=>{
this.presentToast('Item Updated Successfully...')
         },err=>{console.log('error'+err)},()=>console.log('Process completed'))

       }
       async presentToast(message:any) {
        const toast = await this.toastController.create({
          message: message,
          duration: 2000
        });
        toast.present();
      }


      UpdateMainMenu(mainMenuForm){
        console.log(mainMenuForm.form.value);

        console.log(mainMenuForm.form.value);
        console.log("menu Id "+this.menuId)

        var data={
          _id:this.menuId,
          MenuName:mainMenuForm.form.value.mainmenu,
          ViewType:mainMenuForm.form.value.viewtype,

        }

        this.productService.UpdateMainMenu(data).subscribe((res)=>{
this.presentToast('Item Updated Successfully...')
this.GetMainMenu(this.restId);
        },err=>{console.log('error'+err)},()=>console.log('Process completed'))
      }

      GetMainMenu(restId){
        this.mainMenu=[];
        this.mainMenuService.GetMainMenu(restId).subscribe((res)=>{
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

      AddMainMenuBtnClick(){
        this.showSumenu=false;
        this.role='Add';
        this.viewType='List View';
        this.showMainMenuAdd=true;
        this.addMenu=false;
this.productFrom="";
this.productDetails=[];
      }

      AddMainMenu(mainMenuForm){
console.log(mainMenuForm.form.value)

var data={
  RestId:this.restId,
  MenuName:mainMenuForm.form.value.mainmenu,
  AvailableStatus:true,
  ActiveYn:true,
  DeleteYn:false,
  ViewType:mainMenuForm.form.value.viewtype
}

this.mainMenuService.AddMainMenu(data).subscribe((res)=>{
this.presentToast('New Menu Added...');
this.GetMainMenu(this.restId);
this.AddBtn=true;
mainMenuForm.reset();
},err=>{console.log('error'+err)},()=>console.log('Process completed'))
      }

      AddMenuBtnClick(){
      //  this.content.scrollToBottom(300);
      this.productDetails=[];
      this.addMenu=true;
      this.menuImageUrl="";
      }

      AddMenu(formDetails){
console.log(formDetails.form.value);
console.log("add menu button image url" +this.menuImageUrl);
var data={
  restId:this.restId,
  MenuId:this.menuId,
  ProductName:formDetails.form.value.productname,
  Price:formDetails.form.value.productprice,
  Size:"",
  Description:formDetails.form.value.productdescription,
  AvailableTime:"",
  AvailableStatus:true,
  AvailableDays:"",
  ActiveYn:true,
  DeleteYn:false,
  Offer:0,
  OfferPrice:0,
  Commission:0,
  Sort:1,
  ItemCount:0,
  ActualAmount:0,
  ImageUrl:this.menuImageUrl,
  RestaurantName:this.restaurants[0].RestaurantName,
  Category:"",
  Recommended:formDetails.form.value.recommended,
  Badge:false,
  BadgeDescription:"",
  Bestseller:false,
  Suggestion:formDetails.form.value.suggestion
}

this.mainMenuService.AddSubMenu(data).subscribe((res)=>
{
this.presentToast('SubMenu Added Successfully...');
formDetails.reset();
},err=>{console.log('error'+err)},()=>console.log('Process completed'))
      }


      DeleteMainMenu(MenuId){
        var data={
          id:MenuId
        }


this.mainMenuService.DeleteMainMenu(data).subscribe((res)=>{
this.presentToast('Main Menu Deleted Successfully...')
this.GetMainMenu(this.restId);
},err=>{console.log('error'+err)},()=>console.log('Process completed'))







      }



      selectedFile(event){
this.image=event.target.files[0];
this.uploadBtn=false;
      }
sendData(){
  var data={
    _id:"",
    imageUrl:"",
    imageTitle:'ProductImage',
    imageDesc:'Menu',
  }

  if(this.image=="" || this.image==undefined || this.image==null){

  }else{
  this.ownersService.addGallery(data, this.image)   .subscribe((res: any) => {

    if (res.body) {
    console.log(res.body.imageUrl);
    this.menuImageUrl=res.body.imageUrl;
    this.presentToast('Menu Image Uploaded...')
    this.uploadBtn=true;
    }
  }, (err: any) => {
    console.log(err);
    this.presentToast('Menu Image Uploaded error!...')
    this.uploadBtn=false;

  });
}


}

async presentAlertConfirm1(MenuId) {

  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Confirm to delete...',
    message: '<small>Are you sure to delete this menu?</small>',
    buttons: [

     {

        text: 'Okay',
        handler: () => {
          console.log('Confirm Okay');

       // this.ionViewWillEnter();
       this.DeleteMainMenu(MenuId);

        }



      },
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {

        }
      }


    ]
  });

  await alert.present();
}
 }
 interface SelectRestaurants {
   value: string;
   viewValue: string;
 }
