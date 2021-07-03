import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {RegisterUserService} from 'src/app/register-user.service';
import DeliveryLocations from '../models/delivery-locations';
import { ToastController } from '@ionic/angular';
import Register from '../models/register-user';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.page.html',
  styleUrls: ['./register-user.page.scss'],
})
export class RegisterUserPage implements OnInit {
  showPassword=false;
  passwordToogleIcon='eye';
  registeredUsers:Register[]=[];
  userType="Customer";
  registeredUserStatus:boolean=false;
  durationInSeconds=3;
  Address1:String="";
  Address2:String="";
  Address3:String="";
  UserType:String="C";
  ActiveYn:Boolean=true;
  DeleteYn:Boolean=false;
  status="";
  availability:Boolean=true;
  isLoading = false;
deliveryLocation:DeliveryLocations[]=[];
 otpType="New";

  constructor(private router:Router,private registerUserService:RegisterUserService,public toastController: ToastController,public loadingController: LoadingController) { }

  ngOnInit() {
    this.GetRegisteredUsers();
  }
  RedirectToLogin(){
this.router.navigate(['login']);
  }

  RegisterUser(firstName:String,mobileNo:any,password:String){

//this.present();
    const registeruser={
      FirstName:firstName,
      LastName:"",
      Address:"",
      MobileNo:mobileNo,
      Password:password,
      EmailId:"",
      Address1:this.Address1,
      Address2:this.Address2,
      Address3:this.Address3,
      UserType:this.UserType,
      ActiveYn:this.ActiveYn,
      DeleteYn:this.DeleteYn
    }

this.router.navigate(['otp-verification/'+registeruser.MobileNo+'/'+registeruser.Password+'/'+registeruser.FirstName+'/'+this.UserType+'/'+this.otpType]);


//     this.registerUserService.createUser(registeruser).subscribe((list:any)=>{

//       console.log(list.FirstName+' '+list._id);
//       this.registeredUserStatus=true;

//       const deliveryAddress={
//           UserId:list._id,
//           UserName:list.FirstName,
//           MobileNo:list.MobileNo,
//           Address:list.Address,
//           ActiveYn:true,
//           DeleteYn:false,
//           Recent:'Yes',
//           UserType:list.UserType
//       }

//       this.registerUserService.deliveryLocation(deliveryAddress).subscribe((res)=>{

// this.deliveryLocation=res as DeliveryLocations[];
//       })
// this.status="Register User Successfull..."
//      this. presentToast(this.status)

//       this.dismiss();
//       this.router.navigate(['login']);
//     });
}

onItemChange(event:any){
  console.log(" Value is : ", event.detail.value );
  this.UserType=event.detail.value;
}

async presentToast(status:any) {
  const toast = await this.toastController.create({
    message: status,
    duration: 2000
  });
  toast.present();
}

GetRegisteredUsers(){
this.registerUserService.GetRegisteredUsers().subscribe((res)=>{

  this.registeredUsers=res as Register[];
  console.log("Registered Users "+this.registeredUsers);
})
}
ChechAvailability(mobileNo){
  console.log("Entered Mobile No. "+mobileNo);
  for(var i=0;i<this.registeredUsers.length;i++){
    if(this.registeredUsers[i].MobileNo==mobileNo){
      this.availability=false;
      break;

    }
    else{
      this.availability=true;
      continue;
    }
  }
  console.log("Availability "+this.availability);

}
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

