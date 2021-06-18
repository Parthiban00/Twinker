import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-orders-dashboard-admin',
  templateUrl: './orders-dashboard-admin.page.html',
  styleUrls: ['./orders-dashboard-admin.page.scss'],
})
export class OrdersDashboardAdminPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }


  ionViewWillEnter(){

  }

  DeliveryOrders(){
this.router.navigate(['orders-delivery-admin']);
  }

  RedirectToHome(){

  }

  UsersManagement(){

  }
  RestaurantOrders(){
    this.router.navigate(['orders-admin']);
  }
}
