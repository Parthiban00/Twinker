import { Injectable } from '@angular/core';
import { WebService } from './web.service';
//import (WebService)

@Injectable({
  providedIn: 'root'
})
export class OtpVerificationService {

  constructor(private webService:WebService) { }

  SentOtp(data:any){

    //console.log(data);
     return this.webService.post('sendMessage',data);
   }
}
