import { Injectable } from '@angular/core';
import {WebService} from 'src/app/web.service';

@Injectable({
  providedIn: 'root'
})
export class OwnersService {

  constructor(private webService:WebService) { }
  GetRestaurants(data:any){
    console.log('getRestautaus');
  return this.webService.get(`restaurants/${data.UserId}/${data.ActiveYn}`);
}
GetOrders(data:any){
  return this.webService.get(`orderdetails/${data.RestaurantId}/${data.ActiveYn}`)

}
AcceptOders(data:any){
  return this.webService.patch(`orderdetails/${data._id}/${data.RestaurantId}`,data);
}

DeliveryPartnerAccept(data:any){
  console.log('data :'+data);
  return this.webService.patch(`orderdetails/${data._id}/${data.RestaurantId}/${data.ActiveYn}/${data.DeleteYn}`,data);
}
CancelOders(data:any){
  return this.webService.patch(`orderdetails/${data._id}/${data.RestaurantId}`,data);
}
}
