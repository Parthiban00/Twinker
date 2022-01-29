import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BuddyShopService {
  buddy:any;
  constructor() { }

  public setBuddy(data){
    this.buddy=data;
    console.log(this.buddy);
  }
  public getBuddy(){
    console.log(this.buddy)
    return this.buddy;
  }
}
