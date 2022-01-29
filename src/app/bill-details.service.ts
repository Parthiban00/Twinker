import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BillDetailsService {

  extras: any;
 buddy:any;
      constructor() { }

      public setExtras(data){
        this.extras = data;
        console.log(this.extras)
      }

      public getExtras(){
        return this.extras;
      }


}
