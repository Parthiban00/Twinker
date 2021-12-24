import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import{CartService} from 'src/app/cart.service';
import Offers from '../models/offers';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage  {
offers:Offers[];
location;
locality;
  constructor( public toastController: ToastController,private clipboard:Clipboard,private activatedRoute: ActivatedRoute,public modalController: ModalController,private navParams:NavParams,private cartService:CartService) { }

  ngOnInit() {
  }
  CancelModel(){
    //this.modalController.dismiss(this.presentAddress);
    this.modalController.dismiss();
  }
  ionViewWillEnter(){
    this.location = JSON.parse(localStorage.getItem('LocationAddress') || '{}');
    this.locality=this.location.locality;
    console.log('locality '+this.location.locality)
    var data={
      Locality:this.location.locality
    }
    this.cartService.GetOffers(data).subscribe((res)=>{
      this.offers=res as Offers[];
      console.log("offers "+this.offers[1].Code);
    })

  }
  CopyCode(code:string){
    this.clipboard.copy(code);
    this.presentToast();
    this.modalController.dismiss();
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: "Code Copied...",
      duration: 1000
    });
    toast.present();
  }

}
