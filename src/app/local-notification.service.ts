import { trigger } from '@angular/animations';
import { Injectable } from '@angular/core';
import {LocalNotifications} from '@capacitor/local-notifications'
import { Capacitor } from '@capacitor/core';

declare var cordova: any;


import { Platform } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class LocalNotificationService {

   smallIcon: "res://ic_launcher_adaptive_fore";
   d = new Date();
   hours = this.d.getHours();
  mins = this.d.getMinutes();
  weekday = 3 // Wednesday
  constructor(public platform:Platform) {

  }

ngOnInit(){

}

 scheduleNotification(){
LocalNotifications.schedule({
  notifications:[
    {
      title:'Friendly Remainder',
      body:'Join the twinker family',
      id:2,
      extra:{
        data:'pass your data handler',

      },
      iconColor:'#0000FF',
      actionTypeId:'Chat_msg'
    }
  ]
})
 }

 specifyEveryWeekDay(){


 }



}
const methods={
  addListerners(){LocalNotifications.requestPermissions().then((permission)=>{

  })
}
}



