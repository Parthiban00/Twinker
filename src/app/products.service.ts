import { Injectable } from '@angular/core';
import {WebService} from 'src/app/web.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  ActiveYn:Boolean =true;
  constructor(private webService:WebService) { }
  GetProducts(data:any){


     return this.webService.get(`restaurants/${data}/mainmenus/products/get`);
   }

   GetSuggestionProducts(data:any){


    return this.webService.get(`restaurants/${data.restaurantId}/mainmenus/products/${data.suggestion}`);
  }

  GetOffers(data){
    return this.webService.get(`offers/${data.locality}/${data.restaurantId}`);
  }

  UpdateProduct(data){
    return this.webService.patch(`products/${data._id}`,data);
  }

  UpdateMainMenu(data){
    return this.webService.patch(`mainmenus/${data._id}`,data);
  }
  DeleteProduct(data){
    return this.webService.patch(`deleteproducts/products/${data._id}`,data);
  }
}
