import { Injectable } from '@angular/core';
import {WebService} from 'src/app/web.service';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private webService:WebService) { }

  AddCart(data:any){

    //console.log(data);
     return this.webService.post('carts',data);
   }

   GetCart(data:any){

    console.log();
     return this.webService.get(`carts/${data.UserId}/${data.MenuId}/${data.ProductId}/${data.Status}/${data.ActiveYn}`);
   }

   GetCartAll(data:any){

    console.log();
     return this.webService.get(`carts/${data.UserId}/${data.Status}/${data.ActiveYn}`);
   }

   UpdateCart(data:any){
return this.webService.patch(`carts/${data.RestaurantId}/${data.MenuId}/${data.ProductId}/${data.Status}/${data.ActiveYn}/${data.UserId}`,data);
   }

   UpdateCart1(data:any){
    return this.webService.patch(`carts/${data.RestaurantId}/${data.MenuId}/${data.ProductId}/${data.CartItemId}/${data.Status}/${data.ActiveYn}/${data.UserId}`,data);
       }

   RemoveCart(data:any){
    return this.webService.patch('carts',data);
   }

   ItemCountZero(data:any){
     console.log("item count zero")
    return this.webService.patch(`carts/${data.RestaurantId}/${data.MenuId}/${data.ProductId}/${data.UserId}/${data.Status}`,data);
   }

   ItemCountZero1(data:any){
    return this.webService.patch(`carts/${data.RestaurantId}/${data.MenuId}/${data.ProductId}/${data.CartItemId}/${data.UserId}/${data.ActiveYn}/${data.DeleteYn}/${data.Status}`,data);
   }


   GetDeliveryAddress(data:any){
    return this.webService.get(`deliverylocations/${data.UserId}/${data.ActiveYn}`);
   }


   RemoveAddress(data:any){
    return this.webService.patch(`deliverylocations/${data.UserId}/${data.id}/${data.ActiveYn}`,data);
   }


   OrderDetails(data:any){

    //console.log(data);
     return this.webService.post('orderdetails',data);
   }


   UpdateCartPlaced(data:any){
return this.webService.patch('carts',data);
   }

   GetRestaurant(data:any){
     console.log("rest id   "+data.RestaurantId)
    return this.webService.get(`restaurants/${data.RestaurantId}`);
   }
}
