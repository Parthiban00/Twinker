import { Component, OnInit } from '@angular/core';
import {CallNumber} from "@ionic-native/call-number/ngx";
import {Router} from '@angular/router';
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
})
export class ContactUsPage implements OnInit {
  countryCode:string="91";
  whatsappnumber:string;
  url:string;
  constructor(private call:CallNumber,private router:Router) { }

  ngOnInit() {
  }

  CallCustomer(MobileNo:string){
    this.call.callNumber(MobileNo,true)  .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
     }

     WhatsApp(MobileNo:string){

      this.url="https://wa.me/"+this.countryCode+MobileNo+"?text=Hey Twinker";
      window.open(this.url);
     }

     NavigateDirection(){
      let originVal="";
      let modeVal="driving";
     var lat="9.9129967";
     var lon="78.4447256";
      //let url="https://www.google.com/maps/dir/?api=1&travelmode="+modeVal+"&layer=traffic&origin="+lat+","+lon+"&destination"+lat+","+lon;
  window.open('https://www.google.com/maps/dir/?api=1&destination='+lat+','+lon)
  //window.open(url);
    }
    RedirectToHome(){
      this.router.navigate(['home-page']);
    }
  }

