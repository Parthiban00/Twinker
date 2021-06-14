import { Component, OnInit } from '@angular/core';
import { LoadingController,ToastController } from '@ionic/angular';
import {Router,ActivatedRoute} from '@angular/router';
import { OtpVerificationService } from '../otp-verification.service';
import {RegisterUserService} from 'src/app/register-user.service';
import Register from '../models/register-user';
import DeliveryLocations from '../models/delivery-locations';
import Login from '../models/login';

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
password;
users:Login[]=[];
  constructor(private loadingCtrl:LoadingController,private toastCtrl:ToastController,private activatedRouter:ActivatedRoute,private router:Router,private otpService:OtpVerificationService,private registerUserService:RegisterUserService) { }

  ngOnInit() {
     this.mobileNo=this.activatedRouter.snapshot.params.mobileNo;
    this. password=this.activatedRouter.snapshot.params.password;
     this.firstName=this.activatedRouter.snapshot.params.firstName;
    this.UserType=this.activatedRouter.snapshot.params.userType;
    console.log("mobile is "+this.mobileNo);
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
      this.registerUserService.createUser(registeruser).subscribe((list:any)=>{

        console.log(list.FirstName+' '+list._id);
     //  this. users=list as Login[];
        this.registeredUserStatus=true;

        const deliveryAddress={
            UserId:list._id,
            UserName:list.FirstName,
            MobileNo:list.MobileNo,
            Address:list.Address,
            ActiveYn:true,
            DeleteYn:false,
            Recent:'Yes',
            UserType:list.UserType
        }

        this.registerUserService.deliveryLocation(deliveryAddress).subscribe((res)=>{

  this.deliveryLocation=res as DeliveryLocations[];
        })
  this.status="Register User Successfull..."
 // localStorage.setItem("currentUser",JSON.stringify(this.users));
      // this. presentToast(this.status)
        // this._snackBar.openFromComponent(SnackBarComponent, {
        //   duration: this.durationInSeconds * 1000,
        //   data:"User Registered Successful"

        // });
      //  this.dismiss();
        this.router.navigate(['login/'+list.MobileNo+'/'+list.Password]);
      // this.router.navigate(['home-page']);
      });
  }
}

