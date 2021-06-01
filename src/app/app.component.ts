import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  navigate : any;
  constructor() {  this.sideMenu();}

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
