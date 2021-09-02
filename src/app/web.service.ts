import { Injectable } from '@angular/core';
 import{HttpClient}from '@angular/common/http';
 import { HttpClientModule } from '@angular/common/http';
//import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class WebService {
readonly ROOT_URL;
readonly ROOT_URL1;
  constructor(private http:HttpClient) {

    //this.ROOT_URL="https://twinkersvg.herokuapp.com";

  //this.ROOT_URL="http://localhost:5000";
 this.ROOT_URL="http://192.168.43.82:5000";
 //this.ROOT_URL="http://207.180.242.26:5000";
 //this.ROOT_URL="http://207.180.242.26:9000";

//this.ROOT_URL="https://cloud.mongodb.com/v2/60b1ab06336dc744417e35ea#metrics/replicaSet/60b1ad573765ec570c93439b/explorer/twinkertest";

  }
   get(uri:string){
     console.log(uri);
     return this.http.get(`${this.ROOT_URL}/${uri}`);
    //return this.http.get(`${uri}`);
  }

  post(uri:string,payload:Object){

    //console.log(`${this.ROOT_URL}/${uri}`);
     return this.http.post(`${this.ROOT_URL}/${uri}`,payload);
    //return this.http.post(`${uri}`,payload);
  }

  patch(uri:string, payload:Object){
     return this.http.patch(`${this.ROOT_URL}/${uri}`,payload);
    //return this.http.patch(`${uri}`,payload);
  }

  delete(uri:string,payload:Object){
     return this.http.get(`${this.ROOT_URL}/${uri}`,payload);
    //return this.http.get(`${uri}`,payload);
  }








}
