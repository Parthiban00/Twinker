
import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
//import { Geolocation } from '@ionic-native/geolocation/ngx';
//import { Geolocation } from '@capacitor/geolocation';
import { Geolocation } from '@ionic-native/geolocation/ngx';
//import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { ActionSheetController } from '@ionic/angular';
import {RegisterUserService} from 'src/app/register-user.service';
import Cart from '../models/cart';
import DeliveryLocations from '../models/delivery-locations';
import PlaceOrder from '../models/place-order';
import Restaurant from '../models/restaurants';
import{CartService} from 'src/app/cart.service';
import {Router} from '@angular/router';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import Orders from '../models/orders';
import{ProductsService} from 'src/app/products.service';
import MainMenu from '../models/main-menu';
import Product from '../models/products';
import Coupons from '../models/coupons';

import { ModalController } from '@ionic/angular';
import { DeliveryCustomisePage } from '../delivery-customise/delivery-customise.page';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  constructor( public modalController: ModalController,private productService:ProductsService, public toastController: ToastController,private alertController:AlertController,private geolocation: Geolocation,private router:Router,private nativeGeocoder:NativeGeocoder,public actionSheetController: ActionSheetController,private cartService:CartService,private registerUserService:RegisterUserService,public loadingController: LoadingController) { }

  ngOnInit() {
  }

  ionViewWillEnter(){

  }

}
