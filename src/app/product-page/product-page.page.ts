import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import{MainMenuService} from 'src/app/main-menu.service';
import { AlertController } from '@ionic/angular';
import{ProductsService} from 'src/app/products.service';
import MainMenu from '../models/main-menu';
import Product from '../models/products';
import{CartService} from 'src/app/cart.service';
import Cart from '../models/cart';

import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.page.html',
  styleUrls: ['./product-page.page.scss'],
})
export class ProductPagePage implements OnInit {
  selectedMenuName:String="";
  showProgress:boolean=false;
  menu:String="";
  itemTotal1=0;
  restaurantName1:string="";
   showCart:Cart[]=[];
  itemTotal=0;
   restaurantName:string="";
  cartItems:Cart[]=[];
  cartItemsAll:Cart[]=[];
  cartItemsAll1:Cart[]=[];
  itemCount=0;
  totalPrice=0;
  rs:number=60;
  whichRestaurant:string="";
  restaurantId:string="";

   user = JSON.parse(localStorage.getItem('currentUser') || '{}');

   removeCart={
     Status:'Removed',
     ActiveYn:false,
     DeleteYn:true
   }


  /*productDetails=[
   { name:"House Salads",
    status:"Available",
    price:70,
    itemcount:0,
    amount:0
  },

    { name:"Green Salads",
    status:"Available",
    price:120,
    itemcount:0,
    amount:0},
  ];*/

  mainMenu:MainMenu[]=[];
  productDetails:Product[]=[];
  products:Product[]=[];
  isLoading = false;
  constructor(private alertController:AlertController,private activateRoute:ActivatedRoute,private router:Router,private mainMenuService:MainMenuService,private productService:ProductsService,private cartService:CartService,public loadingController: LoadingController) {





  }

  ngOnInit(): void {
    this.present();

this.products.length=0;

    this.getCartAll();

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


    this.whichRestaurant=this.activateRoute.snapshot.params.name;
    this.restaurantId=this.activateRoute.snapshot.params.restId;
    console.log(this.activateRoute.snapshot.params);
    console.log(localStorage.getItem('currentUser'));

  this.mainMenuService.GetMainMenu(this.restaurantId).subscribe((res)=>{
this.mainMenu = res as MainMenu[];
console.log(this.mainMenu);

this.menu=this.mainMenu[0]._id;

this.productService.GetProducts(this.restaurantId).subscribe((res)=>{
this.productDetails=res as Product[];
console.log(this.productDetails);

for(var i=0;i<this.productDetails.length;i++){

  if(this.mainMenu[0]._id==this.productDetails[i].MenuId){
    this.products.push(this.productDetails[i]);
  }
}








})
this.dismiss();



  });



  }


segmentChanged(ev: any) {

  this.products.length=0;
  console.log('Segment changed', ev.detail.value);
//console.log(this.productDetails[1].MenuId);

   for(var k=0;k<this.productDetails.length;k++){

    if(ev.detail.value==this.productDetails[k].MenuId){
       this.products.push(this.productDetails[k]);

     }
   }
   console.log(this.products);

   for(var i=0;i<this.mainMenu.length;i++){
     if(ev.detail.value==this.mainMenu[i]._id){
       this.selectedMenuName=this.mainMenu[i]._id;
     }
   }
}


 IncreaseItem(i:any,menuId:any){

  //this.getCartAll();
  this.present();
  let date: Date = new Date();

   console.log(this.selectedMenuName);
   console.log(this.user[0].FirstName);

   this.products[i].ItemCount=this.products[i].ItemCount+1;
   this.products[i].Amount=this.products[i].Price*this.products[i].ItemCount;

   var addCartItems={

    RestaurantId:this.restaurantId,
    RestaurantName:this.whichRestaurant,
    MenuId:menuId,
    MenuName:this.selectedMenuName,
    ProductId:this.products[i]._id,
    ProductName:this.products[i].ProductName,
    Price:this.products[i].Price,
    ItemCount:this.products[i].ItemCount,
    Amount:this.products[i].Amount,
    UserId:this.user[0]._id,
    UserName:this.user[0].FirstName,
    MobileNo:this.user[0].MobileNo,
    Address:this.user[0].Address,
    CreatedDate:date,
    CreatedBy:this.user[0]._id,
    Status:"Cart",
    ActiveYn:true,
    DeleteYn:false



   }

   var getCart={
     UserId:this.user[0]._id,
    MenuId:menuId,
    ProductId:this.products[i]._id,
     Status:"Cart",
     ActiveYn:true
   }

   // --------------------------------------------  to get all cart items----------------------------------------

this.cartService.GetCartAll(getCart).subscribe((res)=>{
  this.cartItemsAll=res as Cart[];

})
// -------------------------------------------- ----------------------------------------

   console.log(addCartItems);
   this.cartService.GetCart(getCart).subscribe((res)=>{
    this.cartItems=res as Cart[];
    console.log("cart Items ---- "+this.cartItems);





    if(!this.cartItemsAll.length){
      if(!this.cartItems.length){

        console.log("Cart is empty");
        this.cartService.AddCart(addCartItems).subscribe((res)=>{
          this.cartItems=res as Cart[];

          this.getCartAll();

        })
      }
    }
      else if(this.cartItemsAll.length && !this.cartItems.length && this.cartItemsAll[0].RestaurantId==this.restaurantId){



          console.log("Cart is empty");
        this.cartService.AddCart(addCartItems).subscribe((res)=>{
          this.cartItems=res as Cart[];
          this.getCartAll();
        })
        }
        else if(this.cartItemsAll.length && !this.cartItems.length && this.cartItemsAll[0].RestaurantId!=this.restaurantId){

this.dismiss();


            // const dialogRef= this.dialog.open(DialogBoxComponent,{data:{key:'Your cart contains items from '+this.cartItemsAll[0].RestaurantName+'. Do you want to replace?'}});

            // dialogRef.afterClosed().subscribe(result => {
            //   console.log(result);
            //   if(result=='Ok'){

            //     this.cartService.RemoveCart(this.removeCart).subscribe((res)=>{
            //       this.cartItems=res as Cart[];

            //       this.cartService.AddCart(addCartItems).subscribe((res)=>{
            //         this.cartItems=res as Cart[];
            //       })

            //     });



            //   }
            // });
           this. presentAlertConfirm(this.removeCart,addCartItems);



        }





    else if( this.cartItems.length && this.cartItems[0].RestaurantId==addCartItems.RestaurantId){

//update cart items(item count and amount)
                  this.cartService.UpdateCart(addCartItems).subscribe((res)=>{
                    this.cartItems=res as Cart[];

                    this.getCartAll();
                  });
    }else {


    }






   })


 }
 DecreaseItem(i:any,menuId:any){
this.present();
  this.products[i].ItemCount=this.products[i].ItemCount-1;
  this.products[i].Amount=this.products[i].Price*this.products[i].ItemCount;

  let date: Date = new Date();
  var addCartItems={

    RestaurantId:this.restaurantId,
    RestaurantName:this.whichRestaurant,
    MenuId:menuId,
    MenuName:this.selectedMenuName,
    ProductId:this.products[i]._id,
    ProductName:this.products[i].ProductName,
    Price:this.products[i].Price,
    ItemCount:this.products[i].ItemCount,
    Amount:this.products[i].Amount,
    UserId:this.user[0]._id,
    UserName:this.user[0].FirstName,
    MobileNo:this.user[0].MobileNo,
    Address:this.user[0].Address,
    CreatedDate:date,
    CreatedBy:this.user[0]._id,
    Status:"Cart",
    ActiveYn:true,
    DeleteYn:false



   }




if(this.products[i].ItemCount>0){

  this.cartService.UpdateCart(addCartItems).subscribe((res)=>{
    this.cartItems=res as Cart[];

    this.getCartAll();
  });
}
else if(this.products[i].ItemCount==0){

  console.log('item count 0');

  this.cartService.ItemCountZero(addCartItems).subscribe((res)=>{
    this.cartItems=res as Cart[];
    this.showCart.length=0;
this.dismiss();
  });
}



 }

 viewCart(){
  this.router.navigate(['cart']);
 }



 getCartAll(){
   this.itemTotal1=0;
console.log("hi hi hi");
  var getCart={
    UserId:this.user[0]._id,
    Status:"Cart",
    ActiveYn:true,
    DeleteYn:false
  }
  this.cartService.GetCartAll(getCart).subscribe((res)=>{
   this.showCart=res as Cart[];

   for(var i=0;i<this.showCart.length;i++){
    this.itemTotal1+=this.showCart[i].Amount;
     this.restaurantName1=this.showCart[i].RestaurantName;
     }

     this.dismiss();
  })
 }
ViewCart(){
  this.router.navigate(['cart']);
 }

 doRefresh(event) {
  //console.log('Begin async operation');
this.ngOnInit();
  setTimeout(() => {
    console.log('Async operation has ended');
    event.target.complete();
  },);
}

async presentAlertConfirm(clearCart:any,addCart:any) {
  this.present();
  console.log("clear cart "+clearCart+" add cart "+addCart);
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Confirm!',
    message: '<small>Your cart contains items from <strong>'+this.restaurantName1+'</strong>, would you like to replace it?</small>',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Okay',
        handler: () => {
          console.log('Confirm Okay');
          this.cartService.RemoveCart(clearCart).subscribe((res)=>{
                   this.cartItems=res as Cart[];

                   this.cartService.AddCart(addCart).subscribe((res)=>{
                     this.cartItems=res as Cart[];
                   })
                   this.getCartAll();
                 });
        }
      }
    ]
  });

  await alert.present();
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

