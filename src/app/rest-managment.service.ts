import { Injectable } from '@angular/core';
import {WebService} from 'src/app/web.service';
@Injectable({
  providedIn: 'root'
})
export class RestManagmentService {

  constructor(private webService:WebService) { }

  UpdateRestaurantStatus(data:any){
    return this.webService.patch(`restaurants/${data._id}`,data);
       }

       UpdateProductStatus(data:any){
        return this.webService.patch(`products/${data.restId}/${data.menuId}`,data);
           }

           UpdateOneProductStatus(data:any){
            return this.webService.patch(`products/${data.restId}/${data.menuId}/${data.id}`,data);
               }


           UpdateAllRest(data:any){
            return this.webService.patch('restaurants',data);
               }

               UpdateRestaurantDetails(data){
                 return this.webService.patch(`owner/restaurants/${data.id}`,data);
               }

}
