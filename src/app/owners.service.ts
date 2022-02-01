import { Injectable } from '@angular/core';
import {WebService} from 'src/app/web.service';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Product } from './models/gallery';

const apiUrl = 'http://207.180.242.26:3000/gallery';
@Injectable({
  providedIn: 'root'
})
export class OwnersService {



  constructor(private webService:WebService,private http: HttpClient) { }
  GetRestaurants(data:any){
    console.log('getRestautaus');
  return this.webService.get(`restaurants/${data.UserId}/${data.ActiveYn}`);
}
GetOrders(data:any){
  return this.webService.get(`orderdetails/${data.RestaurantId}/${data.ActiveYn}`)

}
AcceptOders(data:any){
  return this.webService.patch(`orderdetails/${data._id}/${data.RestaurantId}`,data);
}

DeliveryPartnerAccept(data:any){
  console.log('data :'+data);
  return this.webService.patch(`orderdetails/${data._id}/${data.RestaurantId}/${data.ActiveYn}/${data.DeleteYn}`,data);
}
CancelOders(data:any){
  return this.webService.patch(`orderdetails/${data._id}/${data.RestaurantId}`,data);
}


addGallery(product: Product, file: File): Observable<any> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('imageTitle', product.imageTitle);
  formData.append('imageDesc', product.imageDesc);






  const header = new HttpHeaders();
  const params = new HttpParams();

  const options = {
    params,
    reportProgress: true,
    headers: header
  };
  const req = new HttpRequest('POST', apiUrl, formData, options);
  return this.http.request(req);
}


}
