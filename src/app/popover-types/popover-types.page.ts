import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, PopoverController } from '@ionic/angular';
@Component({
  selector: 'app-popover-types',
  templateUrl: './popover-types.page.html',
  styleUrls: ['./popover-types.page.scss'],
})
export class PopoverTypesPage implements OnInit {
list:any=[
  "Restaurants",
  "Hotels",
  "Home Mades",
  "Cakes"
]
newArrayDataOfOjbect;
category=[];

  constructor(private navParams:NavParams,public popoverController: PopoverController) {
    this.category=Object.values(this.navParams.data)
    // this.newArrayDataOfOjbect = Object.values(this.category1);
   // console.log("converted array"+this.newArrayDataOfOjbect);
  }

  ngOnInit() {
  }
  ScrollCategory(){
console.log('category item click');
//this.modalController.dismiss();
  }
  _dismiss(itemId:string){
console.log("item id "+itemId);
this.popoverController.dismiss({
  "fromPopover":itemId
})
  }

}
