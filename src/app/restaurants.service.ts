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

  GetRestaurants1(data:any){

    return this.webService.get(`restaurants/${data.ActiveYn}/${data.Type}`);
  }
  GetCategory(data:any){

    return this.webService.get(`shopCategories/${data.Type}`);
  }

}
