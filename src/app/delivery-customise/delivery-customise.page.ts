import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-delivery-customise',
  templateUrl: './delivery-customise.page.html',
  styleUrls: ['./delivery-customise.page.scss'],
})
export class DeliveryCustomisePage implements OnInit {
  isToggle:boolean;
  today;
  myDate;
  startDate;
  endDate;
  deliveryTime="Now";
  selectedTime;
  ExactedSelectedTime;
  myDatePicker;
  constructor(public modalController: ModalController,private navParams:NavParams) {
    this.today=new Date().toISOString();
   }

  ngOnInit() {
  }


  ApplyDeliveryDetails(){
this.modalController.dismiss();
  }
  ToggleEvent(event:any){
   this.isToggle=event.detail.checked;

   if(this.isToggle){

   }

  }

  GetDate(event:any){



    const momentDate = new Date(event.value); // Replace event.value with your date value
    const formattedDate = moment(momentDate).format("YYYY-MM-DD");
    console.log("selected date:"+formattedDate);
this.myDate=formattedDate;

  }
  GetStartDate(event:any){



    const momentDate = new Date(event.value); // Replace event.value with your date value
    const formattedDate = moment(momentDate).format("YYYY-MM-DD");
    console.log("Start Date:"+formattedDate);
this.startDate=formattedDate;
  }
  GetEndDate(event:any){



    const momentDate = new Date(event.value); // Replace event.value with your date value
    const formattedDate = moment(momentDate).format("YYYY-MM-DD");
    console.log("End Date:"+formattedDate);
this.endDate=formattedDate;
  }

  timeChangeHandler(event:any){
    console.log(event);
var eventSplit=event.toString().split(" ");
var eventSplit1=eventSplit[4];
this.selectedTime=eventSplit1;
console.log(eventSplit1);
   console.log(this.selectedTime);


  }

  GetExactDate(event:any){
    console.log(this.myDatePicker);

    const momentDate = new Date(event.value); // Replace event.value with your date value


    const formattedDate = moment(momentDate).format("YYYY-MM-DD");
    console.log("selected date:"+formattedDate);


    var eventSplit=this.myDatePicker.toString().split(" ");

    var eventSplit1=eventSplit[4];
    this.ExactedSelectedTime=eventSplit1;
console.log(this.ExactedSelectedTime);

  }
}
