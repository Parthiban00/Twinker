import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import {WebService} from 'src/app/web.service';

@Injectable({
  providedIn: 'root'
})
export class MainMenuService {
  ActiveYn:Boolean =true;
  constructor(private webService:WebService) { }

  GetMainMenu(data:String){

    return this.webService.get(`restaurants/${data}/${this.ActiveYn}/mainmenus/get`);

  }

  AddMainMenu(data){
    return this.webService.post(`restaurants/${data.RestId}/mainmenus`,data)
  }
}
