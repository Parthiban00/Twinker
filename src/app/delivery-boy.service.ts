import { Injectable } from '@angular/core';
import {WebService} from 'src/app/web.service';
@Injectable({
  providedIn: 'root'
})
export class DeliveryBoyService {

  constructor(private webService:WebService) { }
  GetOrders(data:any){
    return this.webService.get(`orderdetails/${data.ActiveYn}`)

  }

  GetOrdersLocality(data:any){
    return this.webService.get(`deliveryboy/orderdetails/${data.ActiveYn}/${data.Locality}`)

  }
  GetAcceptedOrders(data:any){
    return this.webService.get(`orderdetails/${data.ActiveYn}/${data.UserId}/${data.DeleteYn}`)
  }

  GetFilteredOrders(data:any){
    return this.webService.get(`delivery/orderdetails/${data.ActiveYn}/${data.DeleteYn}/${data.CreatedDate}`)
  }

  GetDeliveryBoys(data:any){
    return this.webService.get(`deliveryboys/${data.Locality}`)

  }
}


