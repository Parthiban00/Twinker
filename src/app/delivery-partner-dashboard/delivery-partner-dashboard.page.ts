import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-delivery-partner-dashboard',
  templateUrl: './delivery-partner-dashboard.page.html',
  styleUrls: ['./delivery-partner-dashboard.page.scss'],
})
export class DeliveryPartnerDashboardPage implements OnInit {

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
this.router.navigate(['orders-delivery-partner']);
  }

  RedirectToHome(){
    this.router.navigate(['home-page']);
  }
}
