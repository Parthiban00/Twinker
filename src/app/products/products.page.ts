import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import{MainMenuService} from 'src/app/main-menu.service';
import { AlertController } from '@ionic/angular';
import{ProductsService} from 'src/app/products.service';
import MainMenu from '../models/main-menu';
import Product from '../models/products';
import{CartService} from 'src/app/cart.service';
import Cart from '../models/cart';
import Category from '../models/category';
import{CategoriesService} from 'src/app/categories.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  products:Product[]=[];
  user:any;
  category:string;
  categoryProducts:Product[];
  isLoading = false;
  cartItems:Cart[]=[];
  cartItemsAll:Cart[]=[];
  cartItemsAll1:Cart[]=[];
  showCart:Cart[]=[];
  itemTotal=0;
  itemTotal1=0;
  type:string;
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
  restaurantName1:string="";

  removeCart={
    Status:'Removed',
    ActiveYn:false,
    DeleteYn:true
  }
  constructor(private categoriesService:CategoriesService,private activatedRouter:ActivatedRoute,private alertController:AlertController,private activateRoute:ActivatedRoute,private router:Router,private mainMenuService:MainMenuService,private productService:ProductsService,private cartService:CartService,public loadingController: LoadingController) { }

  ngOnInit() {
  }

ionViewWillEnter(){

this.user = JSON.parse(localStorage.getItem('currentUser') || '{}');
this.getCartAll();
  this.category=this.activatedRouter.snapshot.params.category;
  this.type=this.activateRoute.snapshot.params.type;
  console.log(this.category.toLocaleLowerCase);

  var data={
    Category:this.category,
    ActiveYn:true
  }
this.categoriesService.GetCategoryProducts(data).subscribe((res)=>{
  this.products=res as Product[];

})

}



IncreaseItem(i:any,menuId:any,restId:any,restName:any){

  //this.getCartAll();
  this.present();


  let date: Date = new Date();


console.log("dsfasdfasf"+i);
  this.products[i].ItemCount=this.products[i].ItemCount+1;
   if(this.products[i].Offer){
   this.products[i].Amount=this.products[i].OfferPrice*this.products[i].ItemCount;
   this.products[i].ActualAmount=this.products[i].OfferPrice*this.products[i].ItemCount;

   }
   else{
    this.products[i].Amount=this.products[i].Price*this.products[i].ItemCount;
    this.products[i].ActualAmount=this.products[i].Price*this.products[i].ItemCount;
   }

   var addCartItems={

    RestaurantId:restId,
    RestaurantName:restName,
    MenuId:menuId,

    ProductId:this.products[i]._id,
    ProductName:this.products[i].ProductName,
    ActualPrice:this.products[i].Price,
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
    DeleteYn:false,
    Offer:this.products[i].Offer,
    OfferDescription:this.products[i].OfferDescription,
    Commission:this.products[i].Commission,
    ActualAmount:this.products[i].ActualAmount,
    Description:this.products[i].Description




   }

   if(this.products[i].Offer){
    addCartItems.Price=this.products[i].OfferPrice;
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
      else if(this.cartItemsAll.length && !this.cartItems.length && this.cartItemsAll[0].RestaurantId==restId){



          console.log("Cart is empty");
        this.cartService.AddCart(addCartItems).subscribe((res)=>{
          this.cartItems=res as Cart[];
          this.getCartAll();
        })
        }
        else if(this.cartItemsAll.length && !this.cartItems.length && this.cartItemsAll[0].RestaurantId!=restId){


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
this.dismiss();

 }

 DecreaseItem(i:any,menuId:any,restId:any,restName:any){
  this.present();
    this.products[i].ItemCount=this.products[i].ItemCount-1;
    if(this.products[i].Offer){
      this.products[i].Amount=this.products[i].OfferPrice*this.products[i].ItemCount;
      this.products[i].ActualAmount=this.products[i].OfferPrice*this.products[i].ItemCount;
      }
      else{
       this.products[i].Amount=this.products[i].Price*this.products[i].ItemCount;
       this.products[i].ActualAmount=this.products[i].Price*this.products[i].ItemCount;
      }

    let date: Date = new Date();
    var addCartItems={

      RestaurantId:restId,
      RestaurantName:restName,
      MenuId:menuId,

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
      DeleteYn:false,
      ActualPrice:this.products[i].Price,
      Offer:this.products[i].Offer,
      OfferDescription:this.products[i].OfferDescription,
      Commission:this.products[i].Commission,
      ActualAmount:this.products[i].ActualAmount,
      Description:this.products[i].Description,
     }

     if(this.products[i].Offer){
      addCartItems.Price=this.products[i].OfferPrice;
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
     // this.showCart.length=0;
     this.getCartAll();
  //this.dismiss();
    });
  }

  this.dismiss();

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

    //this.dismiss();
 })
}

async presentAlertConfirm(clearCart:any,addCart:any) {
  // this.present();
   console.log("clear cart "+clearCart+" add cart "+addCart);
   const alert = await this.alertController.create({
     cssClass: 'my-custom-class',
     header: 'Confirm!',
     message: 'Your cart contains items from <strong>'+this.restaurantName1+'</strong>, would you like to replace it?',
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
          // this.present();
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

 ViewCart(){
  this.router.navigate(['cart']);
 }
 RedirectToHome(){
  this.router.navigate(['home/'+this.type]);
}

}
