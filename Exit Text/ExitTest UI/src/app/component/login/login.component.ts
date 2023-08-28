import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/class/user';
import { ApiService } from 'src/app/service/api.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = new User();
  msg=''
  constructor(private _service: ApiService, private _router: Router) { }

  ngOnInit(): void {
  }

  loginUser() {
    this._service.loginUserFromRemote(this.user).subscribe(
      data => {
        console.log("response received")
        this._router.navigate(['/dashboard'])
      },
      error => {
        console.log("error occured")
        this.msg="Bad Credentials! Please enter valid inputs"
      }
    )
  }

  register(){
    this._router.navigate(['/register'])
  }

}
