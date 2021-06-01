import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.page.html',
  styleUrls: ['./register-user.page.scss'],
})
export class RegisterUserPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  RedirectToLogin(){
this.router.navigate(['login']);
  }
}
