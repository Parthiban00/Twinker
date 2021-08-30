import { AfterViewInit, Component, OnInit, ViewChild ,ElementRef} from '@angular/core';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ActivatedRoute } from '@angular/router';
declare var google;
@Component({
  selector: 'app-delivery-location',
  templateUrl: './delivery-location.page.html',
  styleUrls: ['./delivery-location.page.scss'],
})
export class DeliveryLocationPage implements AfterViewInit {  public folder: string;
  public map;
  public geocoder;
  marker;
  @ViewChild('mapElement', {static: false}) mapElement;
  public formattedAddress;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngAfterViewInit(): void {
    const myLatlng = new google.maps.LatLng(9.8500128, 78.4701256);
    this.geocoder = new google.maps.Geocoder();
    const mapOptions = {
      zoom: 17,
      center: myLatlng
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.marker = new google.maps.Marker({
      position: myLatlng,
      map: this.map,
      draggable: true,
      title: 'Drag me!'
    });
    google.maps.event.addListener(this.marker, 'dragend', () => {
      this.geocodePosition(this.marker.getPosition());
    });
  }

  geocodePosition(pos) {
    this.geocoder.geocode({
      latLng: pos
    }, (responses) => {
      if (responses && responses.length > 0) {
        this.formattedAddress = responses[0].formatted_address;
      } else {
      }
    });
  }


}


