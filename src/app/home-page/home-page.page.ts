import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
})
export class HomePagePage implements OnInit {
  navigate : any;
  constructor(private router:Router) { 
    this.sideMenu();
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
