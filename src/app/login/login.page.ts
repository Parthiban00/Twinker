import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import{UserLoginService} from 'src/app/user-login.service';
import  Login  from '../models/login';
import { ToastController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { IonBottomSheetModule } from 'ion-bottom-sheet';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import {RegisterUserService} from 'src/app/register-user.service';
import Register from '../models/register-user';
import { checkAvailability } from '@ionic-native/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {





coupon;
  availability:Boolean=false;
  registeredUsers:Register[]=[];
  showPassword=false;
  passwordToogleIcon='eye';
  latestData: any;
  loginStatus:boolean=true;
  currentUrl:any;
  subscribe:any;
//userType:String="C";
status:String="Failed";
isLoading = false;
 loginValues={
mobileNo:"",
password:""
  }
  otpType="New";
mobileNo;
password;
UserType='C';
  postList:any;
  durationInSeconds=3;
  users:Login[]=[];
 constructor(private registerUserService:RegisterUserService,private activatedRouter:ActivatedRoute, private router:Router,private userLoginService:UserLoginService,public toastController: ToastController,public actionSheetController: ActionSheetController,private alertController:AlertController,public loadingController: LoadingController,private platform: Platform,private navController:NavController){



  //localStorage.removeItem('currentUser');
  this.currentUrl=this.router.url;
this.mobileNo=this.activatedRouter.snapshot.params.MobileNo;
this.password=this.activatedRouter.snapshot.params.Password;
console.log("mobile no "+this.mobileNo+' password '+this.password);


if(this.mobileNo==undefined || this.mobileNo=="" || this.mobileNo==null){
  console.log("route params not present");
}
else{
  console.log("route params  present");
  this.loginValues.mobileNo=this.mobileNo;
  this.loginValues.password=this.password;
}

  console.log("current url "+this.currentUrl);
  this.subscribe=this.platform.backButton.subscribeWithPriority(666666,()=>{

if(this.currentUrl==="/login"){
if(window.confirm("do you want to exit app?")){
  navigator["app"].exitApp();
}

}
else{
 this.navController.back();
}

})
 }


  ngOnInit(): void {

this.present();
this.GetRegisteredUsers();
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
    FirstName:password,
    ActiveYn:true,
  //  Password:'no'
    //UserType:this.userType
  }



  this.userLoginService.userLogin(loginCredential).subscribe((res)=>{

  this.users=res as Login[];
  if(!this.users.length){
    // this.status="Invalid Mobile No. or Password...";
    // console.log("login failed")

this.dismiss();
    // this.presentToast(this.status);
    this.router.navigate(['otp-verification/'+loginCredential.mobileNo+'/'+loginCredential.FirstName+'/'+this.UserType+'/'+this.otpType]);


    // this.loginValues.mobileNo="";
    // this.loginValues.password="";
  }

  else  {
    this.dismiss();
if(!localStorage.getItem('LocationAddress')){
  localStorage.setItem("currentUser",JSON.stringify(this.users));
  console.log('lcoation no');
  this.router.navigate(['delivery-location'])
}
else{
  this.dismiss();
    this.status="Welcome to Twinker Family...";
    console.log("login successful")


    this.presentToast(this.status);



    console.log(this.users[0].FirstName+' '+this.users[0].MobileNo+' '+this.users[0]._id);

    //this.router.navigate(['home',this.users[0].FirstName,this.users[0]._id]);
    this.dismiss();
    this.router.navigate(['home-page']);
    localStorage.setItem("currentUser",JSON.stringify(this.users));
  }
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
   inputs: [
    {
      name: 'forgetMobileNo',
      type: 'number',

    }],

    buttons: [

      {
        text: 'Cancel',
        handler: () => {
          console.log('Confirm Okay');

        //  this.router.navigate(['home-page']);

        }

      },
      {
        text: 'Okay',
        handler: (alertData) => {
          console.log(alertData.forgetMobileNo);
          this.ChechAvailability(alertData.forgetMobileNo);
        //  this.router.navigate(['home-page']);

        }

      }
    ]
  });

  await alert.present();
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


GetRegisteredUsers(){
  this.registerUserService.GetRegisteredUsers().subscribe((res)=>{

    this.registeredUsers=res as Register[];
    console.log("Registered Users "+this.registeredUsers);
  })
  }

  ChechAvailability(mobileNo){
    var otpType="Forget";
    console.log("Entered Mobile No. "+mobileNo);
    for(var i=0;i<this.registeredUsers.length;i++){
      if(this.registeredUsers[i].MobileNo==mobileNo){
        this.availability=true;
        this.router.navigate(['otp-verification/'+mobileNo+'/'+this.registeredUsers[i].Password+'/'+this.registeredUsers[i].FirstName+'/'+this.registeredUsers[i].UserType+'/'+otpType]);
        break;

      }
      else{
        this.availability=false;
        continue;
      }
    }
    if(this.availability==false){
      this.status="Mobile No. Not Registered Yet...";
      this.presentToast(this.status);
    }
    console.log("Availability "+this.availability);

  }


}
