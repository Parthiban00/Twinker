import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.scss'],
})
export class AdminDashboardPage implements OnInit {

  constructor( private router:Router) { }

  ngOnInit() {
  }
  OrdersManagement(){
    this.router.navigate(['orders-dashboard-admin']);
      }

      RedirectToHome(){
        this.router.navigate(['home-page']);
      }

      UsersManagement(){

      }

      RestaurantManagement(){
        this.router.navigate(['admin-rest-management']);
      }
}
