import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';

import io from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
 //private  socket=io("http://localhost:9000");
private  socket=io("http://207.180.242.26:9000");

  constructor() { }

  JoinRoom(data){
this.socket.emit('JoinRoom',data);
  }

  OrderPlaced(data){
    this.socket.emit('OrderPlaced',data);
  }


  OrderAcceptedByDeliveryPartner(data){
    this.socket.emit('OrderAccepted',data);
  }

  NewOrderPlaced(){
    let obervable=new Observable<{data:any}>(observer=>{
this.socket.on('NewOrderPlaced',(data)=>{
  console.log('new order placed enterd');
  observer.next(data);
});
return()=>{this.socket.disconnect();}
    });
    return obervable;
  }

  GetEmitedAcceptedOrders(){
    let obervable=new Observable<{data:any}>(observer=>{
      this.socket.on('OrderAccepted',(data)=>{
        console.log('get emited accepted orders');
        observer.next(data);
      });
      return()=>{this.socket.disconnect();}
          });
          return obervable;
  }

  OrderAcceptedByRestaurant(data){
    this.socket.emit('OrderAcceptedbyRestaurant',data);
  }
}
