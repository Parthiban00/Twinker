import { Component, OnInit } from '@angular/core';
import  {SocketService} from '../socket.service';
import{OrdersService} from 'src/app/orders.service';
import Orders from '../models/orders';
import {CallNumber} from "@ionic-native/call-number/ngx";
@Component({
  selector: 'app-order-track-modal',
  templateUrl: './order-track-modal.page.html',
  styleUrls: ['./order-track-modal.page.scss'],
})
export class OrderTrackModalPage implements OnInit {
location;
user;
orderDetails: Orders[]=[];
orderDetailsFromSocket=[];
  constructor(private socketService:SocketService,private ordersService:OrdersService,private call:CallNumber) { }

  ngOnInit() {

  }
  ionViewWillEnter(){
    this.location = JSON.parse(localStorage.getItem('LocationAddress') || '{}');
    this.user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    console.log('location'+this.location.address)

    var data={
      room:this.location.locality,
      user:'user'
    }
    this.socketService.JoinRoom(data);


    const getOrders={
      Status:'Placed',
      ActiveYn:true,
    UserId:this.user[0]._id
    };

    this.ordersService.GetPlacedOrders(getOrders).subscribe((res)=>{
      this.orderDetails=res as Orders[];
    //  console.log(this.orderDetails[0].DeliveryPartnerDetails);
     this.orderDetailsFromSocket[0]=this.orderDetails;

    console.log(this.orderDetails[0].DeliveryTime);



         });


         this.socketService.GetEmitedAcceptedOrders().subscribe((data)=>{

          this.orderDetailsFromSocket=[];
          console.log("hi this sockert"+data);
          //this.orderDetailsFromSocket1.push(data.data);
          this.orderDetailsFromSocket.push(data.data);
          console.log("orderDetailsFromSocket -----------"+JSON.stringify(this.orderDetailsFromSocket));

          console.log("orderDetailsFromSocket1111111111111 -----------"+this.orderDetailsFromSocket[0].length);

          //this.createAlert();

          });
  }
  CalltoDeliveryBoy(mobileNo:any){
    console.log(mobileNo);
    this.call.callNumber(mobileNo,true)  .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }




}
