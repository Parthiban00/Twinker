import { Injectable } from '@angular/core';
  import { LocalNotifications } from '@capacitor/local-notifications';
//  import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

import { Platform } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class LocalNotificationService {

  constructor(public platform:Platform) { }


   async showLocalNotification(id : number, title : string, text : string){


    LocalNotifications.schedule({
      notifications: [
        {
          title: "New Order Received",
          body: "New Order Received, Tap to check it...",
          id: 1,
          extra:{

          },
          sound:'notification.wav',









        }
      ]
    });
   }

   async showLocalNotification1(){


    LocalNotifications.schedule({
      notifications: [
        {
          title: "Have a Nice Day...",
          body: "Biriyani === Happiness, Get Biriyani with 20% OFF from your favorite restaurants... Tap to order now...",
          id: 2,
          extra:{

          },
          sound:'notification.wav',


        }
      ]
    });
   }

   async showLocalNotification730(){


    LocalNotifications.schedule({
      notifications: [
        {
          title: "Good Breakfast decides entire day...",
          body: "Happy Morning! Take your breakfast that makes your day as well as you like...",
          id: 3,
          extra:{

          },
          sound:'notification.wav',
schedule:{
  every:'day',
  on:{

    hour:7,
    minute:30
  }

}

        }
      ]
    });
   }

   async showLocalNotification830(){


    LocalNotifications.schedule({
      notifications: [
        {
          title: "Idly makes your day happy..",
          body: "Order now to get 20% OFF for your healthy breakfast...",
          id: 4,
          extra:{

          },
          sound:'notification.wav',
schedule:{
  every:'day',
  on:{

    hour:8,
    minute:30
  }

}

        }
      ]
    });
   }

   async showLocalNotification10(){


    LocalNotifications.schedule({
      notifications: [
        {
          title: "which one is your favorite...",
          body: "Fresh juices | Fruit salats | Fresh fruits | Milk shakes.. Just tap to order now...",
          id: 4,
          extra:{

          },
          sound:'notification.wav',
schedule:{
  every:'day',
  on:{

    hour:10,
    minute:0
  }

}

        }
      ]
    });
   }


   async showLocalNotification2(){


    LocalNotifications.schedule({
      notifications: [
        {
          title: "Grill Or Tandorri",
          body: "Just tap to order now... Chicken is waiting for you...",
          id: 5,
          extra:{

          },
          sound:'notification.wav',
schedule:{
  every:'day',
  on:{

    hour:14,
    minute:0
  }

}

        }
      ]
    });
   }


   async showLocalNotification3(){


    LocalNotifications.schedule({
      notifications: [
        {
          title: "Fresh fruits or Fruit salats..",
          body: "No only Fresh juices hahaha... Tap to make your break healthier...",
          id: 6,
          extra:{

          },
          sound:'notification.wav',
schedule:{
  every:'day',
  on:{

    hour:15,
    minute:30
  }

}

        }
      ]
    });
   }

   async showLocalNotification5(){


    LocalNotifications.schedule({
      notifications: [
        {
          title: "Crispy start at this eve more ever...",
          body: "Tap to order now... Crispy, Crunchy, Delicious...",
          id:7,
          extra:{

          },
          sound:'notification.wav',
schedule:{
  every:'day',
  on:{

    hour:17,
    minute:0
  }

}

        }
      ]
    });
   }

   async showLocalNotification630(){


    LocalNotifications.schedule({
      notifications: [
        {
          title: "Which one you choose...",
          body: "1 pizza, 2 Burger, 3 Sandwich, tap to order now...",
          id: 5,
          extra:{

          },
          sound:'notification.wav',
schedule:{
  every:'day',
  on:{

    hour:18,
    minute:30
  }

}

        }
      ]
    });
   }

   async showLocalNotification8(){


    LocalNotifications.schedule({
      notifications: [
        {
          title: "Good nit, hey just feed mee...",
          body: "Your stomach is crying... Pls consider it, Tap to order now...",
          id: 7,
          extra:{

          },
          sound:'notification.wav',
schedule:{
  every:'day',
  on:{

    hour:20,
    minute:0
  }

}

        }
      ]
    });
   }

   async showLocalNotification9(){


    LocalNotifications.schedule({
      notifications: [
        {
          title: "Grill Or Tandorri",
          body: "Just tap to order now... Chicken is waiting for you...",
          id: 5,
          extra:{

          },
          sound:'notification.wav',
schedule:{
  every:'day',
  on:{

    hour:17,
    minute:20
  }

}

        }
      ]
    });
   }
  //  async showLocalNotification(id : number, title : string, text : string){

  //    LocalNotifications.schedule({
  //   notifications:[
  //    {
  //        title : title,
  //        body : text,
  //        id : id,
  //        extra:{
  //          data:'pass data to your handler'
  //        },
  //     iconColor:'#ff6b00',
  //        sound:'file://assets/notification.wav',
  //        smallIcon:'https://firebasestorage.googleapis.com/v0/b/twinker-70d21.appspot.com/o/logo.png?alt=media&token=95e046de-463d-4271-8f78-68dfc4be67e0',


  //    }
  //    ]
  //  });
  // }

//   async showLocalNotification1(id : number, title : string, text : string){

//     LocalNotifications.schedule({
//     notifications:[
//     {
//         title : title,
//         body : text,
//         id : id,
//         extra:{
//           data:'pass data to your handler'
//         },
//         iconColor:'#ff6b00',

// schedule:{},
//     }

//     ]
//     });
//   }


  // setSound(){
  //   if(this.platform)
  // }



}
