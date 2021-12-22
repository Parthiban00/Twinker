import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-setup-location',
  templateUrl: './setup-location.page.html',
  styleUrls: ['./setup-location.page.scss'],
})
export class SetupLocationPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  RedirectToMap(){
    this.router.navigate(['delivery-location'])
  }
}
