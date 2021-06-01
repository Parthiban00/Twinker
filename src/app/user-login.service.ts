import { Injectable } from '@angular/core';
import {WebService} from 'src/app/web.service';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {
  constructor(private webService:WebService) { }
  userLogin(data:any){

 console.log(data);
  return this.webService.get(`userregisters/${data.mobileNo}/${data.password}/${data.ActiveYn}/${data.UserType}`);
}
}
