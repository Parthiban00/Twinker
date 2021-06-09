import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import{UserLoginService} from 'src/app/user-login.service';
import  Login  from '../models/login';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  latestData: any;
  loginStatus:boolean=true;
//userType:String="C";
status:String="Failed";

 loginValues={
mobileNo:"",
password:""
  }


  postList:any;
  durationInSeconds=3;
  users:Login[]=[];
 constructor(private router:Router,private userLoginService:UserLoginService,public toastController: ToastController){

  //localStorage.removeItem('currentUser');
 }


  ngOnInit(): void {



    if(!localStorage.getItem('currentUser')){
console.log("no");
    }
    else{
      this.router.navigate(['home-page']);
      console.log("yes");

    }
  }
Login(mobileNo:String,password:String){


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
    this.router.navigate(['home-page']);
    localStorage.setItem("currentUser",JSON.stringify(this.users));

  }

});
}
Register(){
  this.router.navigate(['register-user']);
}

ForgetPassword(){
  this.router.navigate(['forget-password']);
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
}
