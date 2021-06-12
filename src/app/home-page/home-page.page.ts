import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { LoadingController } from '@ionic/angular';
import Orders from '../models/orders';
import{OrdersService} from 'src/app/orders.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
})
export class HomePagePage implements OnInit {
  navigate : any;
  user:any;
  isLoading = false;
  userType:any;
  orderDetails: Orders[]=[];
  constructor(private router:Router,public loadingController: LoadingController,private ordersService: OrdersService) {

  }




  slidesOptions={

  }

  RestaurantPage(){
    this.router.navigate(['home']);
  }
  Dashboard(){
    console.log("user Type "+this.userType);
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
      console.log("this is "+this.userType);
    }
  }

  ngOnInit() {

    this.user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.userType=this.user[0].UserType;
    this.sideMenu();
    console.log("home page etered");
    var getOrders={
      Status:"Placed",
      ActiveYn:true,
      UserId:this.user[0]._id
    }

    this.ordersService.GetPlacedOrders(getOrders).subscribe((res)=>{
      this.orderDetails=res as Orders[];
     // console.log(this.orderDetails);





         })
  }

  sideMenu()
  {
    this.navigate=
    [
      {
        title : "Cart",
        url   : "/home",
        icon  : "cart"
      },
      {
        title : "Orders",
        url   : "/home",
        icon  : "list"
      },
      {
        title : "Favourites",
        url   : "/chat",
        icon  : "heart"
      },
      {
        title : "Help Us To Improve",
        url   : "/contacts",
        icon  : "trending-up"
      },
      {
        title : "About Us",
        url   : "/contacts",
        icon  : "paw"
      },
      {
        title : "Terms And Conditions",
        url   : "/contacts",
        icon  : "information-circle"
      },
      {
        title : "Sign Out",
        url   : "/contacts",
        icon  : "log-out",

      },
    ]
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

   ionViewDidEnter(){
    this.ngOnInit();
  //this.list.length=0;


  }
  OrdersPage(){
    this.router.navigate(['orders']);
  }
}
