import { Component, OnInit } from '@angular/core';
import { LoadingController,ToastController } from '@ionic/angular';
import {Router,ActivatedRoute} from '@angular/router';
import { OtpVerificationService } from '../otp-verification.service';
import {RegisterUserService} from 'src/app/register-user.service';
import Register from '../models/register-user';
import DeliveryLocations from '../models/delivery-locations';
import Login from '../models/login';
import{UserLoginService} from 'src/app/user-login.service';

//import { clear } from 'console';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.page.html',
  styleUrls: ['./otp-verification.page.scss'],
})
export class OtpVerificationPage implements OnInit {
otp: string="";
generatedOTP:any;
mobileNo:number;
message:any;
Address1:String="";
Address2:String="";
Address3:String="";
UserType:String="C";
ActiveYn:Boolean=true;
DeleteYn:Boolean=false;
deliveryLocation:DeliveryLocations[]=[];
status="";
registerUser:any;
registeredUserStatus:boolean=false;
firstName;
user;
password='no';
users:Login[]=[];
otpType;
  constructor(private userLoginService:UserLoginService,private loadingCtrl:LoadingController,private toastCtrl:ToastController,private activatedRouter:ActivatedRoute,private router:Router,private otpService:OtpVerificationService,private registerUserService:RegisterUserService) { }

  ngOnInit() {
     this.mobileNo=this.activatedRouter.snapshot.params.mobileNo;
   // this. password=this.activatedRouter.snapshot.params.password;
     this.firstName=this.activatedRouter.snapshot.params.firstName;
    this.UserType=this.activatedRouter.snapshot.params.userType;
    this.otpType=this.activatedRouter.snapshot.params.otpType;
    console.log("mobile is "+this.mobileNo);
    console.log("otp Type "+this.otpType);
    this.setIpFocus();
    this.gfg();
  }

 gfg() {
    var minm = 100000;
    var maxm = 999999;
    this.generatedOTP = Math.floor(Math
    .random() * (maxm - minm + 1)) + minm;
    console.log(this.generatedOTP);
    this.message="Twinker-Register: Verification OTP to Join With Us... "+this.generatedOTP;

   var smsData={
message:this.message,
number:this.mobileNo

    }

     this.otpService.SentOtp(smsData).subscribe((res)=>{
       console.log("otp sended");
     })
}
  setIpFocus(){
    for(let i=1;i<=6;i++){
      if((this.otp.length+1)==i){
        document.getElementById("ip"+i).style.background="var(--ion-color-dark)";
      }
      else{
        document.getElementById("ip"+i).style.background="var(--ion-color-light)";
      }
    }
  }


clear(){
  this.otp="";
  this.setIpFocus();
}

back(){
  this.otp=this.otp.slice(0,-1);
  this.setIpFocus();
}

set(number){
  this.otp+=number;
  this.setIpFocus();
  if(this.otp.length==6){
    this.presentLoading();
    this.checkOTP();
  }


}

async presentLoading() {
  const loading=await this.loadingCtrl.create({
    message:'Verifying OTP...',
    spinner:"circular"
  });
  await loading.present();
}

async presentToast(message,color){
  const toast=await this.toastCtrl.create({
    message:message,
    color:color,
    duration:1000,
    position:"middle",
  });
  toast.present();
}

checkOTP(){
  setTimeout(()=>{
    this.loadingCtrl.dismiss();
    if(this.otp==this.generatedOTP){
      this.presentToast("Verified, Welcome to Twinker","success");
     this. RegisterUser();
    }
    else{
      this.presentToast("Invalid OTP","danger");
    }
  },2000);
}


RegisterUser(){
 // this.present();
 if(this.otpType=='New'){
      const registeruser={
        FirstName:this.firstName,
        LastName:"",
        Address:"",
        MobileNo:this.mobileNo,
        Password:this.password,
        EmailId:"",
        Address1:this.Address1,
        Address2:this.Address2,
        Address3:this.Address3,
        UserType:this.UserType,
        ActiveYn:this.ActiveYn,
        DeleteYn:this.DeleteYn
      }



      //console.log(firstName);
      //this.registerUserService.createUser(firstName,lastName,address,mobileNo,password,emailId,this.Address1,this.Address2,this.Address3,this.UserType,this.ActiveYn,this.DeleteYn);
      this.registerUserService.createUser(registeruser).subscribe((res)=>{
        this.users=res as Login[];

        this.registeredUserStatus=true;
        localStorage.setItem("currentUser",JSON.stringify(this.users));


  this.status="Welcome to Twinker Family...";


      //  this.router.navigate(['home-page']);
      this.Login();

      });
    }
    else{
      this.router.navigate(['login/'+this.mobileNo+'/'+this.password]);
    }
  }

  gfgf(){
    this.presentToast("OTP Re-sended...","success");
    this.gfg();
  }

  Login(){
    const loginCredential={

      mobileNo:this.mobileNo,
      FirstName:this.password,
      ActiveYn:true,

    }
  this.userLoginService.userLogin(loginCredential).subscribe((res)=>{

    this.users=res as Login[];

      console.log("login successful")

      console.log(this.users[0].FirstName+' '+this.users[0].MobileNo+' '+this.users[0]._id);

      localStorage.setItem("currentUser",JSON.stringify(this.users));
      this.router.navigate(['delivery-location'])

  });
  }
}



