import { Injectable } from '@angular/core';
import {WebService} from 'src/app/web.service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  constructor(private webService:WebService) { }

  GetRestaurants(){

    return this.webService.get('restaurants');
  }


  GetOwnersRestaurant(data){
console.log(data.UserId)
    return this.webService.get(`restaurants/orders/${data.UserId}/${data.ActiveYn}/${data.DeleteYn}`);
  }

  GetRestaurants1(data:any){

    return this.webService.get(`restaurants/${data.ActiveYn}/${data.Type}/${data.Locality}`);
  }

  GetRestaurants11(data:any){

    return this.webService.get(`restaurants/specificcategory/${data.ActiveYn}/${data.Type}/${data.Locality}/${data.AvailableStatus}`);
  }
  GetCategory(data:any){

    return this.webService.get(`shopCategories/${data.Type}`);
  }

}
