import { Component, OnInit, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
declare const L:any;
@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  lat:any;
  lon:any;

  constructor(private geolocation: Geolocation) { }





  ngOnInit() {

    var map = L.map('mapid').setView([40.725, -73.985], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  var geocodeService = L.esri.Geocoding.geocodeService({
    apikey:'AAPKd4adcedf2122456d84303cac03f0556dwSm4eCy2zgbfYe22E9mVvBNWJeQm65Jo6d1SR74bETi8ZpXfjR4Wpb_LDMI07W4m' // replace with your api key - https://developers.arcgis.com
  });

  map.on('click', function (e) {
    console.log(e.latlng);
    var D={
lat:9.9130983,
lng:78.4444128
    }
    geocodeService.reverse().latlng(D).run(function (error, result) {
      if (error) {
        return;
      }

      L.marker(result.latlng).addTo(map).bindPopup(result.address.Match_addr).openPopup();
      console.log('Address '+result.address.Match_addr);
    });
  });




    this.geolocation.getCurrentPosition({

      timeout:10000,
      enableHighAccuracy:true
    }).then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude

      this.lat=resp.coords.latitude;
      this.lon=resp.coords.longitude;

      var D={
        lat:9.851748,
        lng:78.482916
            }
            geocodeService.reverse().latlng(D).run(function (error, result) {
              if (error) {
                return;
              }

              L.marker(result.latlng).addTo(map).bindPopup(result.address.Match_addr).openPopup();
              console.log('Address '+result.address);
            });

      console.log(resp.coords.latitude);
      console.log(resp.coords.longitude);
      // this.ReverseGeocoding(this.lat,this.lon);
     }).catch((error) => {
       console.log('Error getting location', error);
     });

     let watch = this.geolocation.watchPosition();
     watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude

     });

  }

}
