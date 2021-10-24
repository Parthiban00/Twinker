import { Injectable } from '@angular/core';
import {WebService} from 'src/app/web.service';
@Injectable({
  providedIn: 'root'
})
export class BuddyService {

  constructor(private webService:WebService) { }

uploadImage(blobData,name,ext){
  const formData=new FormData();
  formData.append('file',blobData,`myimage.${ext}`);
  formData.append('name',name);
  return this.webService.post(`saveCatelog`,formData)
}

uploadImageFile(file:File){
  const formData=new FormData();
  formData.append('file',file,file.name);
  formData.append('name',file.name);
  return this.webService.post(`saveCatelog`,formData)
}


}
