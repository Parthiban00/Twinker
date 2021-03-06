import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import{MainMenuService} from 'src/app/main-menu.service';
import { AlertController, IonContent } from '@ionic/angular';
import{ProductsService} from 'src/app/products.service';
import MainMenu from '../models/main-menu';
import Product from '../models/products';
import{CartService} from 'src/app/cart.service';
import Cart from '../models/cart';
import Category from '../models/category';
import{CategoriesService} from 'src/app/categories.service';
import { LoadingController } from '@ionic/angular';
import Restaurant from '../models/restaurants';
import{RestaurantsService} from 'src/app/restaurants.service';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../popover/popover.component';
import{PopoverTypesPage} from '../popover-types/popover-types.page';

import SpecificCategory from '../models/specific-category';
@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  products:Product[]=[];
  CartItemsLocal=[];
  cartItemsLocal=[];
  user = JSON.parse(localStorage.getItem('currentUser') || '{}');
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
  restaurantDetails:Restaurant[]=[];
  restaurantName1:string="";
  specialOffers;
  removeCart;
  specificCategory:SpecificCategory[];
  bannerImage;
  location;

  @ViewChild(IonContent) content: IonContent;
  constructor(public popoverController: PopoverController,private restaurantService:RestaurantsService,private categoriesService:CategoriesService,private activatedRouter:ActivatedRoute,private alertController:AlertController,private activateRoute:ActivatedRoute,private router:Router,private mainMenuService:MainMenuService,private productService:ProductsService,private cartService:CartService,public loadingController: LoadingController) { }

  ngOnInit() {
  }

ionViewWillEnter(){
this.bannerImage="";
this.getCartAll();
this. CartItemsLocal=JSON.parse(localStorage.getItem('CartItems') || '{}');
if(this.CartItemsLocal.length){
  this.restaurantName1=this.CartItemsLocal[0].RestaurantName;
}
  this.category=this.activatedRouter.snapshot.params.category;
  this.type=this.activateRoute.snapshot.params.type;
  console.log(this.category);
  this.location=JSON.parse(localStorage.getItem('LocationAddress') || '{}');

  var data={
    Category:this.category,
    ActiveYn:true,
    Type:this.type,

  }

  this.categoriesService.GetSpecificCategory1(data).subscribe((res)=>{
    this.specificCategory=res as SpecificCategory[];
    console.log("specific ---------------------------- categories "+this.specificCategory.length);
    this.bannerImage=this.specificCategory[0].BannerImage;

   })
this.categoriesService.GetCategoryProducts(data).subscribe((res)=>{
  this.products=res as Product[];

})


var getRest={
  ActiveYn:true,
  Type:this.type,
  Locality:this.location.locality,
  AvailableStatus:true
  }

  this.restaurantService.GetRestaurants11(getRest).subscribe((res)=>{


    this.restaurantDetails=res as Restaurant[];
    console.log(this.restaurantDetails);
  })

this.removeCart={
  Status:'Removed',
  ActiveYn:false,
  DeleteYn:true,
  UserId:this.user[0]._id,

}

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
    MenuName:"",
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
    Description:this.products[i].Description,
    Type:this.type




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
     header: 'Replace cart...',
     message: 'Your cart contains items from  '+this.restaurantName1+', would you like to replace it?',
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
          //  this.cartService.RemoveCart(clearCart).subscribe((res)=>{
          //           this.cartItems=res as Cart[];

          //           this.cartService.AddCart(addCart).subscribe((res)=>{
          //             this.cartItems=res as Cart[];
          //             this.getCartAll();
          //           })

          //         });

          this.cartItemsLocal=[];
          this.cartItemsLocal.push(addCart);
          console.log('cart item undefined')
         localStorage.setItem("CartItems",JSON.stringify(this.cartItemsLocal));
         this.restaurantName1=addCart.RestaurantName;
         this. CartItemsLocal=JSON.parse(localStorage.getItem('CartItems') || '{}');
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




IncreaseItem1(i:any,menuId:any,restId:any,restName:any){

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
   var getCart={
    UserId:this.user[0]._id,
   MenuId:menuId,
   ProductId:this.products[i]._id,
    Status:"Cart",
    ActiveYn:true
  }
   var addCartItems={

    RestaurantId:restId,
    RestaurantName:restName,
    MenuId:menuId,
    //MenuName:this.selectedMenuName,
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
    Description:this.products[i].Description,
    Type:this.type




   }

   if(this.products[i].Offer){
    addCartItems.Price=this.products[i].OfferPrice;
      }



   // --------------------------------------------  to get all cart items----------------------------------------

this.cartService.GetCartAll(getCart).subscribe((res)=>{
  this.cartItemsAll=res as Cart[];
  console.log("rest id "+restId);
  console.log("cart rest id "+this.cartItemsAll[0].RestaurantId);
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

 async presentPopover(ev: any) {
  const popover = await this.popoverController.create({
    component: PopoverTypesPage,
    cssClass: 'my-custom-class',
    event: ev,
    translucent: true,
    componentProps:this.restaurantDetails
  });

  popover.onDidDismiss().then((data:any)=>{
console.log("from popover data  "+data.data.fromPopover);
this.scrollFn(data.data.fromPopover);
  })
  await popover.present();

  const { role } = await popover.onDidDismiss();
  console.log('onDidDismiss resolved with role', role);
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


IncraseItemLocalStorage(i:any,menuId:any,restId:any,restName:any){
  let date: Date = new Date();
  this. CartItemsLocal=JSON.parse(localStorage.getItem('CartItems') || '{}');

 var productPresent=false;
 this.products[i].ItemCount=this.products[i].ItemCount+1;
 this.products[i].Amount=this.products[i].Price*this.products[i].ItemCount;
   this.products[i].ActualAmount=this.products[i].Price*this.products[i].ItemCount;

   var addCartItems={

     RestaurantId:restId,
     RestaurantName:restName,
     MenuId:menuId,
     MenuName:'',
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
     Description:this.products[i].Description,
     Type:this.type




    }

    if(!localStorage.getItem('CartItems') || !this.CartItemsLocal.length){
      this.cartItemsLocal=[];
      this.cartItemsLocal.push(addCartItems);
      console.log('cart item undefined')
     localStorage.setItem("CartItems",JSON.stringify(this.cartItemsLocal));
     this.restaurantName1=restName;
     this. CartItemsLocal=JSON.parse(localStorage.getItem('CartItems') || '{}');
    }
    else{
      console.log('present');
      if(localStorage.getItem('CartItems')){
       this. CartItemsLocal=JSON.parse(localStorage.getItem('CartItems') || '{}');
//console.log(this.CartItemsLocal[0].RestaurantId)
if(this.CartItemsLocal[0].RestaurantId==restId){
 console.log('same')

for(var k=0;k<this.CartItemsLocal.length;k++){
 if(this.CartItemsLocal[k].MenuId==menuId && this.CartItemsLocal[k].ProductId==this.products[i]._id){
   console.log('same menu present index '+k)

   var addCartItems1={

     RestaurantId:restId,
     RestaurantName:restName,
     MenuId:menuId,
     MenuName:'',
     ProductId:this.products[i]._id,
     ProductName:this.products[i].ProductName,
     ActualPrice:this.products[i].Price,
     Price:this.products[i].Price,
     ItemCount:this.CartItemsLocal[k].ItemCount+1,
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
     Description:this.products[i].Description,
     Type:this.type




    }


productPresent=true;
this.CartItemsLocal[k]=addCartItems1;
console.log(this.CartItemsLocal+' '+restName)
localStorage.setItem("CartItems",JSON.stringify(this.CartItemsLocal));

   break;
 }

}
if(productPresent==false){
 //this.cartItemsLocal.push(this.CartItemsLocal);
 //this.cartItemsLocal.push(addCartItems);
 this.CartItemsLocal.push(addCartItems);
 console.log(this.CartItemsLocal);
 localStorage.setItem("CartItems",JSON.stringify(this.CartItemsLocal));

}

}
else if(this.CartItemsLocal[0].RestaurantId!=restId){
console.log('Different restaurant cart items ');
this.presentAlertConfirm(this.removeCart,addCartItems);
}
      }
    }

}


DecreaseItemLocal(i:any,menuId:any,restId:any,restName:any){
  let date: Date = new Date();
  this. CartItemsLocal=JSON.parse(localStorage.getItem('CartItems') || '{}');

  this.products[i].ItemCount=this.products[i].ItemCount-1;
  console.log("item count "+this.products[i].ItemCount)
  if(this.products[i].ItemCount>0){


for(var k=0;k<this.CartItemsLocal.length;k++){
  if(this.CartItemsLocal[k].MenuId==menuId && this.CartItemsLocal[k].ProductId==this.products[i]._id){
    console.log('same menu present index '+k)

    var addCartItems1={

      RestaurantId:restId,
      RestaurantName:restName,
      MenuId:menuId,
      MenuName:'',
      ProductId:this.products[i]._id,
      ProductName:this.products[i].ProductName,
      ActualPrice:this.products[i].Price,
      Price:this.products[i].Price,
      ItemCount:this.CartItemsLocal[k].ItemCount-1,
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
      Description:this.products[i].Description,
      Type:this.type




     }



this.CartItemsLocal[k]=addCartItems1;
console.log(this.CartItemsLocal)
localStorage.setItem("CartItems",JSON.stringify(this.CartItemsLocal));

    break;
  }

}
  }
  else if(this.products[i].ItemCount<=0){
    console.log('0 entered '+JSON.stringify(this.CartItemsLocal));
    for(var l=0;l<this.CartItemsLocal.length;l++){
      console.log('for entred '+l)
      if(this.CartItemsLocal[l].MenuId==menuId && this.CartItemsLocal[l].ProductId==this.products[i]._id){
        console.log('product present '+typeof(this.CartItemsLocal))
var ll=l+1
       this.CartItemsLocal.splice(l,1);
        console.log(" dfddddddddddddd "+JSON.stringify(this.CartItemsLocal))
        localStorage.setItem("CartItems",JSON.stringify(this.CartItemsLocal));

      }}
  }
}


}
