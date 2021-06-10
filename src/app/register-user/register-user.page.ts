import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {RegisterUserService} from 'src/app/register-user.service';
import DeliveryLocations from '../models/delivery-locations';
import { ToastController } from '@ionic/angular';
import Register from '../models/register-user';
@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.page.html',
  styleUrls: ['./register-user.page.scss'],
})
export class RegisterUserPage implements OnInit {

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

deliveryLocation:DeliveryLocations[]=[];

  constructor(private router:Router,private registerUserService:RegisterUserService,public toastController: ToastController) { }

  ngOnInit() {
    this.GetRegisteredUsers();
  }
  RedirectToLogin(){
this.router.navigate(['login']);
  }

  RegisterUser(firstName:String,mobileNo:any,password:String){

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



    //console.log(firstName);
    //this.registerUserService.createUser(firstName,lastName,address,mobileNo,password,emailId,this.Address1,this.Address2,this.Address3,this.UserType,this.ActiveYn,this.DeleteYn);
    this.registerUserService.createUser(registeruser).subscribe((list:any)=>{

      console.log(list.FirstName+' '+list._id);
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
     this. presentToast(this.status)
      // this._snackBar.openFromComponent(SnackBarComponent, {
      //   duration: this.durationInSeconds * 1000,
      //   data:"User Registered Successful"

      // });
      this.router.navigate(['login']);
    });
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
}

