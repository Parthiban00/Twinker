import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-restaurant-owner-dashboard',
  templateUrl: './restaurant-owner-dashboard.page.html',
  styleUrls: ['./restaurant-owner-dashboard.page.scss'],
})
export class RestaurantOwnerDashboardPage implements OnInit {
  default:string="";
  constructor(private router:Router) {
    this.default="Placed"
  }

  ngOnInit() {
  }
  segmentChanged(ev: any) {


    console.log('Segment changed', ev.detail.value);
  //console.log(this.productDetails[1].MenuId);
  this.default=ev.detail.value;
  }
  OrdersManagement(){
this.router.navigate(['orders-management']);
  }
  RedirectToHome(){
    this.router.navigate(['home-page']);
  }
  RestaurantManagement(){
this.router.navigate(['owner-rest-management']);
  }
}
