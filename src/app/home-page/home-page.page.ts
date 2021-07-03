import { Component, OnInit,OnDestroy, HostListener } from '@angular/core';
import {Router} from '@angular/router';
import { LoadingController } from '@ionic/angular';
import Orders from '../models/orders';
import{OrdersService} from 'src/app/orders.service';
import { Platform } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import{CartService} from 'src/app/cart.service';
import Cart from '../models/cart';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
})
export class HomePagePage implements OnInit,OnDestroy {
  navigate: any;
  user: any;
  isLoading = false;
  userType: any;
  orderDetails: Orders[]=[];
  subscribe: any;
  currentUrl:any;
  cartItemsAll:Cart[]=[];
  orderStatus:String;
  constructor(private cartService:CartService,private router: Router,public loadingController: LoadingController,private ordersService: OrdersService,private platform: Platform,private navController:NavController) {


  }




  slidesOptions={

  };

  RestaurantPage(type:String){
    console.log(type);
    this.router.navigate(['home/'+type]);
  }
  Dashboard(){
    console.log('user Type '+this.userType);
    if(this.userType=='R'){
      this.router.navigate(['restaurant-owner-dashboard']);
    }
    else if(this.userType=='D'){
      this.router.navigate(['delivery-partner-dashboard']);
    }
    else if(this.userType=='A'){
      this.router.navigate(['admin-dashboard']);
    }
    else{
      console.log('this is '+this.userType);
    }
  }

  ngOnInit() {



   this.currentUrl=this.router.url;

    console.log("current url "+this.currentUrl);
    this.subscribe=this.platform.backButton.subscribeWithPriority(666666,()=>{

 if(this.currentUrl==="/home-page"){
  if(window.confirm("do you want to exit app?")){
    navigator["app"].exitApp();
  }

 }
 else{
   this.navController.back();
 }

 })

    this.user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.userType=this.user[0].UserType;
    this.sideMenu();
    console.log('home page etered');
    const getOrders={
      Status:'Placed',
      ActiveYn:true,
      UserId:this.user[0]._id
    };

    this.ordersService.GetPlacedOrders(getOrders).subscribe((res)=>{
      this.orderDetails=res as Orders[];
     // console.log(this.orderDetails);





         });
  }

  sideMenu()
  {
    this.navigate=
    [
      {
        title : 'Cart',
        url   : '/home',
        icon  : 'cart'
      },
      {
        title : 'Orders',
        url   : '/home',
        icon  : 'list'
      },
      {
        title : 'Favourites',
        url   : '/chat',
        icon  : 'heart'
      },
      {
        title : 'Help Us To Improve',
        url   : '/contacts',
        icon  : 'trending-up'
      },
      {
        title : 'About Us',
        url   : '/contacts',
        icon  : 'paw'
      },
      {
        title : 'Terms And Conditions',
        url   : '/contacts',
        icon  : 'information-circle'
      },
      {
        title : 'Sign Out',
        url   : '/contacts',
        icon  : 'log-out',

      },
    ];
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
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

  LogOut(){
    // console.log("hi logout");
   // window.cache.clear();
    localStorage.removeItem('currentUser');
    this.router.navigate(['login']);
   }

   ionViewWillEnter(){
   this.ngOnInit();

  //this.list.length=0;


  }
  onDestroy(){
    console.log("page destroyed");
  }
  @HostListener('unloaded')
  ngOnDestroy(){
    console.log("Home angular page destroyed");
  }
  ionViewWillLeave() {
this.currentUrl="";
  }

  OrdersPage(){
    this.router.navigate(['orders']);
  }

  ViewCart(){
    this.router.navigate(['cart']);
  }
}
