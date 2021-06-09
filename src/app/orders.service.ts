import { Injectable } from '@angular/core';
import {WebService} from 'src/app/web.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private webService:WebService) { }

  GetPlacedOrders(data:any){


     return this.webService.get(`orderdetails/${data.UserId}/${data.Status}/${data.ActiveYn}`);
   }
}
