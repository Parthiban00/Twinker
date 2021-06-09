import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
})
export class HomePagePage implements OnInit {
  navigate : any;
  user:any;
  userType:any;
  constructor(private router:Router) {
    this.user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.userType=this.user[0].UserType;
    this.sideMenu();
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
}
