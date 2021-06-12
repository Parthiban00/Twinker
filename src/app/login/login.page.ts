import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import{UserLoginService} from 'src/app/user-login.service';
import  Login  from '../models/login';
import { ToastController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  showPassword=false;
  passwordToogleIcon='eye';
  latestData: any;
  loginStatus:boolean=true;
//userType:String="C";
status:String="Failed";
isLoading = false;
 loginValues={
mobileNo:"",
password:""
  }


  postList:any;
  durationInSeconds=3;
  users:Login[]=[];
 constructor(private router:Router,private userLoginService:UserLoginService,public toastController: ToastController,public actionSheetController: ActionSheetController,private alertController:AlertController,public loadingController: LoadingController){

  //localStorage.removeItem('currentUser');
 }


  ngOnInit(): void {

this.present();

    if(!localStorage.getItem('currentUser')){
console.log("no");
this.dismiss();
    }
    else{
      this.dismiss();
      this.router.navigate(['home-page']);
      console.log("yes");


    }
  }
Login(mobileNo:String,password:String){

  //this.presentLoading();
  this.present();
  const loginCredential={

    mobileNo:mobileNo,
    password:password,
    ActiveYn:true,
    //UserType:this.userType
  }



  this.userLoginService.userLogin(loginCredential).subscribe((res)=>{

  this.users=res as Login[];
  if(!this.users.length){
    this.status="Invalid Mobile No. or Password...";
    console.log("login failed")

this.dismiss();
    this.presentToast(this.status);


    this.loginValues.mobileNo="";
    this.loginValues.password="";
  }
  else{

    this.status="Logged In Successfull...";
    console.log("login successful")


    this.presentToast(this.status);



    console.log(this.users[0].FirstName+' '+this.users[0].MobileNo+' '+this.users[0]._id);

    //this.router.navigate(['home',this.users[0].FirstName,this.users[0]._id]);
    this.dismiss();
    this.router.navigate(['home-page']);
    localStorage.setItem("currentUser",JSON.stringify(this.users));

  }

});
}
Register(){
  this.router.navigate(['register-user']);
}

ForgetPassword(){
  console.log("forget password");
  this.presentAlertConfirm();
}

reloadCurrentRoute() {
  let currentUrl = this.router.url;
  this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
     // console.log(currentUrl);
  });
}

// onItemChange(value:any){
//   console.log(" Value is : ", value );
//   this.userType=value;
// }

async presentToast(status:any) {
  const toast = await this.toastController.create({
    message: status,
    duration: 2000
  });
  toast.present();
}

// ForgetPassword(){

// }

async presentActionSheet() {
  const actionSheet = await this.actionSheetController.create({
    header: 'Reset Password',
    cssClass: 'my-custom-class',
    buttons: [{
      text: 'Current Location',
      role: 'destructive',
      icon: 'location',
      handler: () => {



      }


    }]
  });
  await actionSheet.present();

  const { role } = await actionSheet.onDidDismiss();
  console.log('onDidDismiss resolved with role', role);
}

async presentAlertConfirm() {

  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
   header: 'Enter Your Mobile No.',
    message: ' <ion-item  >'+

    '<ion-input  name="mobileNo"  minlength="10" maxlength="10" required></ion-input>'+
 ' </ion-item>',
    buttons: [
     {
        text: 'Okay',
        handler: () => {
          console.log('Confirm Okay');

        //  this.router.navigate(['home-page']);

        }
      }
    ]
  });

 // await alert.present();
}

// async presentLoading() {
//   const loading = await this.loadingController.create({
//     cssClass: 'my-custom-class',
//     message: 'Please wait...',
//     duration: 2000
//   });
//   await loading.present();

//   const { role, data } = await loading.onDidDismiss();
//   console.log('Loading dismissed!');
// }

async present() {
  this.isLoading = true;
  return await this.loadingController.create({
    // duration: 5000,
    cssClass: 'my-custom-class',
        message: 'Please wait...',
  }).then(a => {
    a.present().then(() => {
      console.log('presented');
      if (!this.isLoading) {
        a.dismiss().then(() => console.log('abort presenting'));
      }
    });
  });
}

async dismiss() {
  this.isLoading = false;
  return await this.loadingController.dismiss().then(() => console.log('dismissed'));
}

IconToggle(){
    this.showPassword=!this.showPassword;
    if(this.passwordToogleIcon=='eye'){
      this.passwordToogleIcon='eye-off';
    }
    else{
      this.passwordToogleIcon='eye';
    }
}
}
