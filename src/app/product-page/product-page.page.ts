import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import{MainMenuService} from 'src/app/main-menu.service';
import { AlertController, IonContent, IonSegment } from '@ionic/angular';
import{ProductsService} from 'src/app/products.service';
import MainMenu from '../models/main-menu';
import Product from '../models/products';
import{CartService} from 'src/app/cart.service';
import Cart from '../models/cart';
import { PopoverController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import{PopoverTypesPage} from '../popover-types/popover-types.page';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';


@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.page.html',
  styleUrls: ['./product-page.page.scss'],
})
export class ProductPagePage implements OnInit {
  @ViewChild('search') search : any;
  @ViewChild(IonContent) content: IonContent;
  @ViewChild(IonSegment) segment: IonSegment;
completedCount=0;
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
  isSearch=true;
  searchMenu;
  searchedItem: any;
  user:any;
  ViewType;
behaviour="start";
block="smooth";
parthi=true;
  skeleton=[

    {},
    {},
    {},
    {}
    ]
    removeCart;




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
  type:String;
  paramsMenuId:string;

  opts = {
    freeMode:true,
    slidesPreview:2.8,
    slidesOffsetBefore:30,
    slidesOffsetAfter:100
  }
  constructor(public popoverController: PopoverController,private activatedRouter:ActivatedRoute,private alertController:AlertController,private activateRoute:ActivatedRoute,private router:Router,private mainMenuService:MainMenuService,private productService:ProductsService,private cartService:CartService,public loadingController: LoadingController) {





  }

  ngOnInit(): void {




  }
  ionViewWillEnter(){
   this.user = JSON.parse(localStorage.getItem('currentUser') || '{}');
   this.whichRestaurant=this.activateRoute.snapshot.params.name;
   this.restaurantId=this.activateRoute.snapshot.params.restId;
   this.type=this.activateRoute.snapshot.params.type;
   this.paramsMenuId=this.activateRoute.snapshot.params.menuId;
   console.log(this.activateRoute.snapshot.params);
   console.log(localStorage.getItem('currentUser'));

    this.searchMenu="";
    this.isSearch=true;
    //this.present();
//this.productDetails=[];
    this.products.length=0;

        this.getCartAll();
      this.removeCart={
          Status:'Removed',
          ActiveYn:false,
          DeleteYn:true,
          UserId:this.user[0]._id,

        }
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



console.log("rest id "+this.restaurantId);
      this.mainMenuService.GetMainMenu(this.restaurantId).subscribe((res)=>{
    this.mainMenu = res as MainMenu[];
    console.log("ain menus "+this.mainMenu);

    if(this.paramsMenuId==null || this.paramsMenuId==undefined || this.paramsMenuId==""){
      this.menu=this.mainMenu[0]._id;
    }
    else{
      this.menu=this.paramsMenuId;
    //  this.segmentChangedSpecialOffers();


    }


   this.productService.GetProducts(this.restaurantId).subscribe((res)=>{
    this.productDetails=res as Product[];


    this.searchedItem=res as Product[];
    console.log(this.productDetails);


    for(var i=0;i<this.productDetails.length;i++){
      this.completedCount+=1;

      if(this.mainMenu[0]._id==this.productDetails[i].MenuId){
        this.products.push(this.productDetails[i]);
      }
      if(this.completedCount==this.productDetails.length && this.paramsMenuId){
        this.segmentChangedSpecialOffers();
      }
    }









    })




    // this.dismiss();



      });
  }

  getProducts(fn){

    this.productService.GetProducts(this.restaurantId).subscribe((res)=>{
      this.productDetails=res as Product[];


      this.searchedItem=res as Product[];
      console.log(this.productDetails);


      for(var i=0;i<this.productDetails.length;i++){

        if(this.mainMenu[0]._id==this.productDetails[i].MenuId){
          this.products.push(this.productDetails[i]);
        }
      }
      fn(this.segmentChangedSpecialOffers);









      })

  }



  segmentChangedSpecialOffers(){

    this.products.length=0;
    console.log('Segment changed -----', this.paramsMenuId);
  //console.log(this.productDetails[1].MenuId);
  for(var j=0;j<this.mainMenu.length;j++){
  if(this.paramsMenuId==this.mainMenu[j]._id){
    this.ViewType=this.mainMenu[j].ViewType;
    console.log("view type "+this.ViewType)
  }
  }
     for(var k=0;k<this.productDetails.length;k++){

      if(this.paramsMenuId==this.productDetails[k].MenuId ){
         this.products.push(this.productDetails[k]);
       }
     }
     console.log("special offers menu id chagend "+this.products);

     for(var i=0;i<this.mainMenu.length;i++){
       if(this.paramsMenuId==this.mainMenu[i]._id){
         this.selectedMenuName=this.mainMenu[i]._id;
       }
     }
  }
// ionViewDidEnter(){
//   console.log("hi and hello  im parhtiban");
// }

segmentChanged(ev: any) {

  this.products.length=0;
  console.log('Segment changed', ev.detail.value);
//console.log(this.productDetails[1].MenuId);
for(var j=0;j<this.mainMenu.length;j++){
if(ev.detail.value==this.mainMenu[j]._id){
  this.ViewType=this.mainMenu[j].ViewType;
  console.log("view type "+this.ViewType)
}
}
   for(var k=0;k<this.productDetails.length;k++){

    if(ev.detail.value==this.productDetails[k].MenuId ){
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


console.log("dsfasdfasf"+i);
  this.productDetails[i].ItemCount=this.productDetails[i].ItemCount+1;
   if(this.productDetails[i].Offer){
   this.productDetails[i].Amount=this.productDetails[i].OfferPrice*this.productDetails[i].ItemCount;
   this.productDetails[i].ActualAmount=this.productDetails[i].OfferPrice*this.productDetails[i].ItemCount;

   }
   else{
    this.productDetails[i].Amount=this.productDetails[i].Price*this.productDetails[i].ItemCount;
    this.productDetails[i].ActualAmount=this.productDetails[i].Price*this.productDetails[i].ItemCount;
   }

   var addCartItems={

    RestaurantId:this.restaurantId,
    RestaurantName:this.whichRestaurant,
    MenuId:menuId,
    MenuName:this.selectedMenuName,
    ProductId:this.productDetails[i]._id,
    ProductName:this.productDetails[i].ProductName,
    ActualPrice:this.productDetails[i].Price,
    Price:this.productDetails[i].Price,
    ItemCount:this.productDetails[i].ItemCount,
    Amount:this.productDetails[i].Amount,
    UserId:this.user[0]._id,
    UserName:this.user[0].FirstName,
    MobileNo:this.user[0].MobileNo,
    Address:this.user[0].Address,
    CreatedDate:date,
    CreatedBy:this.user[0]._id,
    Status:"Cart",
    ActiveYn:true,
    DeleteYn:false,
    Offer:this.productDetails[i].Offer,
    OfferDescription:this.productDetails[i].OfferDescription,
    Commission:this.productDetails[i].Commission,
    ActualAmount:this.productDetails[i].ActualAmount,
    Description:this.productDetails[i].Description,
    Type:this.type




   }

   if(this.productDetails[i].Offer){
    addCartItems.Price=this.productDetails[i].OfferPrice;
      }

   var getCart={
     UserId:this.user[0]._id,
    MenuId:menuId,
    ProductId:this.productDetails[i]._id,
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
this.dismiss();

 }


 IncreaseItemOffer(i:any,menuId:any){
  //this.getCartAll();
  this.present();


  let date: Date = new Date();


console.log("dsfasdfasf"+i);
  this.productDetails[i].ItemCount=this.productDetails[i].ItemCount+1;
   if(this.productDetails[i].Offer){
   this.productDetails[i].Amount=this.productDetails[i].OfferPrice*this.productDetails[i].ItemCount;
   this.productDetails[i].ActualAmount=this.productDetails[i].OfferPrice*this.productDetails[i].ItemCount;

   }
   else{
    this.productDetails[i].Amount=this.productDetails[i].Price*this.productDetails[i].ItemCount;
    this.productDetails[i].ActualAmount=this.productDetails[i].Price*this.productDetails[i].ItemCount;
   }

   var addCartItems={

    RestaurantId:this.restaurantId,
    RestaurantName:this.whichRestaurant,
    MenuId:menuId,
    MenuName:this.selectedMenuName,
    ProductId:this.productDetails[i]._id,
    ProductName:this.productDetails[i].ProductName,
    ActualPrice:this.productDetails[i].Price,
    Price:this.productDetails[i].Price,
    ItemCount:this.productDetails[i].ItemCount,
    Amount:this.productDetails[i].Amount,
    UserId:this.user[0]._id,
    UserName:this.user[0].FirstName,
    MobileNo:this.user[0].MobileNo,
    Address:this.user[0].Address,
    CreatedDate:date,
    CreatedBy:this.user[0]._id,
    Status:"Cart",
    ActiveYn:true,
    DeleteYn:false,
    Offer:this.productDetails[i].Offer,
    OfferDescription:this.productDetails[i].OfferDescription,
    Commission:this.productDetails[i].Commission,
    ActualAmount:this.productDetails[i].ActualAmount,
    Description:this.productDetails[i].Description,
    Type:this.type




   }

   if(this.productDetails[i].Offer){
    addCartItems.Price=this.productDetails[i].OfferPrice;
      }

   var getCart={
     UserId:this.user[0]._id,
    MenuId:menuId,
    ProductId:this.productDetails[i]._id,
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
this.dismiss();

 }



 DecreaseItem(i:any,menuId:any){
this.present();
  this.productDetails[i].ItemCount=this.productDetails[i].ItemCount-1;
  if(this.productDetails[i].Offer){
    this.productDetails[i].Amount=this.productDetails[i].OfferPrice*this.productDetails[i].ItemCount;
    this.productDetails[i].ActualAmount=this.productDetails[i].OfferPrice*this.productDetails[i].ItemCount;
    }
    else{
     this.productDetails[i].Amount=this.productDetails[i].Price*this.productDetails[i].ItemCount;
     this.productDetails[i].ActualAmount=this.productDetails[i].Price*this.productDetails[i].ItemCount;
    }

  let date: Date = new Date();
  var addCartItems={

    RestaurantId:this.restaurantId,
    RestaurantName:this.whichRestaurant,
    MenuId:menuId,
    MenuName:this.selectedMenuName,
    ProductId:this.productDetails[i]._id,
    ProductName:this.productDetails[i].ProductName,
    Price:this.productDetails[i].Price,
    ItemCount:this.productDetails[i].ItemCount,
    Amount:this.productDetails[i].Amount,
    UserId:this.user[0]._id,
    UserName:this.user[0].FirstName,
    MobileNo:this.user[0].MobileNo,
    Address:this.user[0].Address,
    CreatedDate:date,
    CreatedBy:this.user[0]._id,
    Status:"Cart",
    ActiveYn:true,
    DeleteYn:false,
    ActualPrice:this.productDetails[i].Price,
    Offer:this.productDetails[i].Offer,
    OfferDescription:this.productDetails[i].OfferDescription,
    Commission:this.productDetails[i].Commission,
    ActualAmount:this.productDetails[i].ActualAmount,
    Description:this.productDetails[i].Description,
   }

   if(this.productDetails[i].Offer){
    addCartItems.Price=this.productDetails[i].OfferPrice;
      }


if(this.productDetails[i].ItemCount>0){

  this.cartService.UpdateCart(addCartItems).subscribe((res)=>{
    this.cartItems=res as Cart[];

    this.getCartAll();
  });
}
else if(this.productDetails[i].ItemCount==0){

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

     //this.dismiss();
  })
 }
ViewCart(){
  this.router.navigate(['cart']);
 }

 doRefresh(event) {
  //console.log('Begin async operation');
this.ionViewWillEnter();
  setTimeout(() => {
    console.log('Async operation has ended');
    event.target.complete();
  },);
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
                     this.getCartAll();
                   })

                 });
        }
      }
    ]
  });

  await alert.present();
}
RedirectToHome(){
  this.router.navigate(['home/'+this.type]);
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

option={
  slidePerView:1.5,
  centeredSlides:true,
  loop:true,
  spaceBetween:20,
  autoplay:true,
}

AddToFavourite(menuId:any){
document.getElementById(menuId).style.color="red";
}

slideChanged(slides){

}

SearchMenu(){
  this.isSearch=false;
  this.products=this.productDetails;
  this.searchedItem = this.products;
  setTimeout(() => {
    this.search.setFocus();
  }, 500);
}
CancelSearch(){
  this.isSearch=true;
}

SearchChange(event:any){
  console.log("search change "+event.detail.value);
  this.products=this.productDetails;
  //this.searchedItem = this.products;
  //console.log("rest details"+this.restaurantDetails);
  const val = event.target.value;
  if (val && val.trim() != '') {
    this.products = this.products.filter((item: any) => {
      console.log(item.ProductName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      return (item.ProductName.toLowerCase().indexOf(val.toLowerCase()) > -1);

    })
  }

}

async presentPopover(ev: any) {
  const popover = await this.popoverController.create({
    component: PopoverTypesPage,
    cssClass: 'my-custom-class',
    event: ev,
    translucent: true,
    componentProps:this.mainMenu
  });

  popover.onDidDismiss().then((data:any)=>{
console.log("from popover data  "+data.data.fromPopover);
this.scrollFn(data.data.fromPopover);
this.menu=data.data.fromPopover;
  })
  await popover.present();

  const { role } = await popover.onDidDismiss();
  console.log('onDidDismiss resolved with role', role);
}



scrollFn(anchor: string): void{
  console.log("hi scroll"+anchor);
  this.parthi=false;
//   this._vps.scrollToAnchor(anchor);
// let arr=this.lists.nativeElement.children;
// let item=arr[anchor];
// item.scrollIntoView({behaviour:'smooth',block:'start'});
  //this.content.scrollX(0, , 4000)
  let y = document.getElementById(anchor).offsetTop;
        this.content.scrollToPoint(0,y,1000);


}
}

