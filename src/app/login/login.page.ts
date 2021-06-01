import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import{UserLoginService} from 'src/app/user-login.service';
import  Login  from '../models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  latestData: any;
  loginStatus:boolean=true;
userType:String="C";

 loginValues={
mobileNo:"",
password:""
  }


  postList:any;
  durationInSeconds=3;
  users:Login[]=[];
 constructor(private router:Router,private userLoginService:UserLoginService){}


  ngOnInit(): void {
    if(!localStorage.getItem('currentUser')){
console.log("no");
    }
    else{
      this.router.navigate(['home']);
      console.log("yes");

    }
  }
Login(mobileNo:String,password:String){


  const loginCredential={

    mobileNo:mobileNo,
    password:password,
    ActiveYn:"Yes",
    UserType:this.userType
  }


/*this.userLoginService.userLogin(loginCredential).subscribe((data:any)=>{


  console.log(data.FirstName);
  console.log(data.length);
})*/

this.userLoginService.userLogin(loginCredential).subscribe((res)=>{

  this.users=res as Login[];
  if(!this.users.length){
    console.log("login failed")
    // this._snackBar.openFromComponent(SnackBarComponent, {
    //   duration: this.durationInSeconds * 1000,
    //   data:"Invalid MobileNo. or Password..."


    //});
    this.loginValues.mobileNo="";
    this.loginValues.password="";
  }
  else{
    console.log("login successful")


    // this.dataService.dataUpdated.subscribe((loginStatus) => {
    //   this.latestData = loginStatus;
    // });

    console.log(this.users[0].FirstName+' '+this.users[0].MobileNo+' '+this.users[0]._id);

    this.router.navigate(['home',this.users[0].FirstName,this.users[0]._id]);
    localStorage.setItem("currentUser",JSON.stringify(this.users));
    //this.router.navigate(['AppComponent']);
    //this.reloadCurrentRoute();
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

onItemChange(value:any){
  console.log(" Value is : ", value );
  this.userType=value;
}
}
