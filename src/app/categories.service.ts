import { Injectable } from '@angular/core';
import {WebService} from 'src/app/web.service';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private webService:WebService) { }


  GetCategory(data:any){


     return this.webService.get(`categories/${data.Type}/${data.ActiveYn}`);
   }

   GetCategoryProducts(data:any){
    return this.webService.get(`random/products/${data.Category}`);

   }
}