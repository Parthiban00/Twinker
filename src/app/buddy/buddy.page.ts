import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { ModalController } from '@ionic/angular';
import {ChangeLocationPage} from '../change-location/change-location.page';
import {Platform,ActionSheetController} from '@ionic/angular';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Storage } from '@capacitor/storage';
import { ElementSchemaRegistry } from '@angular/compiler';
import { Action } from 'rxjs/internal/scheduler/Action';
import { base64StringToBlob } from 'blob-util';
@Component({
  selector: 'app-buddy',
  templateUrl: './buddy.page.html',
  styleUrls: ['./buddy.page.scss'],
})
export class BuddyPage implements OnInit {
MyForm : FormGroup;
values=[];

@ViewChild('fileInput',{static:false})fileInput:ElementRef;
  constructor( private actionSheetCtrl:ActionSheetController ,private plt:Platform ,private fb:FormBuilder, public modalController: ModalController,private router:Router) {

    this.MyForm=this.fb.group({
      shopname:new FormControl('',Validators.compose([Validators.required,Validators.pattern('[a-zA-z0-9]')])),
      shoplocation:new FormControl('',Validators.compose([Validators.required])),
      inputtype:new FormControl('',Validators.compose([Validators.required]))

    })
  }

  ngOnInit() {
  }
  item1:string;
  user;
  time;
  today1;
  location;
selectedLocation;
inputType;
uploadBtn:boolean=true;
manualDiv:boolean=false;

  ionViewWillEnter(){
    // ---------------------------------------------------------------------getDate------------------------
    this.user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.location = JSON.parse(localStorage.getItem('LocationAddress') || '{}');
    let today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

     this.today1 = yyyy + '-' + mm + '-' + dd;
// --------------------------------------------------------------------------get Date end----------------------
// ----------------------------------------------------------------------------get Time-----------------------------
var d = new Date(); // for now
d.getHours(); // => 9
d.getMinutes(); // =>  30
d.getSeconds(); // => 51
this.time=d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();
  }


  ChangeLocation(){
    this.modalController.create({
      component:ChangeLocationPage,
      componentProps:this.location
              }).then(modalres=>{
                modalres.present();

                modalres.onDidDismiss().then(res=>{
                  if(res.data!=null){

console.log('changed address '+res.data.address);
this.selectedLocation=res.data.address;

console.log("selected Location "+this.selectedLocation);

                  }
                  else{
                    console.log('resposnse null');
                  }
                })
              })

  }

  radioGroupChange(event:any){
    console.log(event.detail.value);
    if(event.detail.value=="upload"){
this.uploadBtn=true;
this.manualDiv=false;
    }
    else if(event.detail.value=="manual"){
      this.uploadBtn=false;
this.manualDiv=true;

    }
  }

  SubmitForm(){
console.log("form details "+JSON.stringify(this.MyForm.value));
  }


  async selectImageSource(){
    const buttons=[
      {
        text:'Take Photo',
        icon:'camera',
        handler:()=>{
          this.addImage(CameraSource.Camera);
        }
      },
      {
        text:'Choose From Gallary',
        icon:'image',
        handler:()=>{
          this.addImage(CameraSource.Photos);
        }
      }
    ];
    if(!this.plt.is('hybrid')){
      buttons.push({
        text:'Choose a File',
        icon:'attact',
        handler:()=>{
          this.fileInput.nativeElement.click();
        }
      })
    }
    const actionSheet=await this.actionSheetCtrl.create({
      header:'Select Image Source',
      buttons
    });
    await actionSheet.present();
  }

  async addImage(source:CameraSource){
    const image = await Camera.getPhoto({
      quality:60,
      allowEditing:true,
      resultType:CameraResultType.Base64,
      source
    });
    const contentType = 'image/png';
    console.log('image: ',image);
   //const blobData= this.b64toBlob(image.base64String);
   const blob = base64StringToBlob(image.base64String, `image/${image.format}`);
console.log("blobData "+blob);
  }
  uploadFile(event:any){
    // const eventObj: MSInputMethodContext = event as MSInputMethodContext;
    // const target:HTMLInputElement=event.target as HTMLInputElement;
     const file:File=event.target.files[0];

    console.log(file);

  }

  b64toBlob(dataURI) {

    var byteString = atob(dataURI.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);

    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/jpeg' });
}

PushItem(){
console.log("push item "+this.MyForm);

}

removeValue(i){
  this.values.splice(i,1);
}
addValue(){
  this.values.push({value:""});
}
}
