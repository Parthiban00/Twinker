import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  navigate : any;
  constructor(private router:Router) {  this.sideMenu();}

  sideMenu()
  {
    this.navigate=
    [
      {
        title : "Cart",
        url   : "/cart",
        icon  : "cart"
      },
      {
        title : "Orders",
        url   : "/orders",
        icon  : "list"
      },
      {
        title : "Favourites",
        url   : "/favourites",
        icon  : "heart"
      },
      {
        title : "Help Us To Improve",
        url   : "/to-improve",
        icon  : "trending-up"
      },
      {
        title : "About Us",
        url   : "/about-us",
        icon  : "paw"
      },
      {
        title : "Terms And Conditions",
        url   : "/terms-conditions",
        icon  : "information-circle"
      },
      {
        title : "Sign Out",
       url   : "/login",
        icon  : "log-out",
       // function:LogOut()


      },
    ]
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

   LogOut(){
    // console.log("hi logout");
    localStorage.removeItem('currentUser');
    this.router.navigate(['login']);
   }


}
