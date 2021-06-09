import { Injectable } from '@angular/core';
import {WebService} from './web.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterUserService {

  constructor( private webService:WebService) { }

  //createUser(FirstName:String,LastName:String,Address:String,MobileNo:String,Password:String,Email:String,Address1:String,Address2:String,Address3:String,UserType:String,ActiveYn:String,DeleteYn:String){
    createUser(data:any){
      console.log("create user : "+data.FirstName);
   /* console.log("create user :" +FirstName);
    console.log("create user :" +UserType);
    console.log("create user :" +ActiveYn);*/
    return this.webService.post('userregisters',data);
  }

  deliveryLocation(data:any){


  return this.webService.post('deliverylocations',data);
}
}
