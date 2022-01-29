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

getCategory(data){
  return this.webService.get(`buddycategories/${data.Locality}`);
}

SaveBuddyOrders(data){
  return this.webService.post('buddyorders',data);


}

GetSubmittedOrders(data){
  console.log('created date on budddy sevice '+data.CreatedDate)
  return this.webService.get(`buddyorders/${data.Locality}/${data.CreatedDate}`)
}




}
