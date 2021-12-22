import { Injectable } from '@angular/core';
import {WebService} from 'src/app/web.service';
@Injectable({
  providedIn: 'root'
})
export class GeocodingService {

  constructor(private webService:WebService) { }

  GetLocality(){

    console.log();
     return this.webService.get('localities');
   }

   UpdateAddress(data:any){
    return this.webService.patch(`userregisters/location/${data.id}`,data);
       }
}
