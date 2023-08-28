import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/class/user';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  msg=''
  msg1=''
  user = new User()
  constructor(private _service: ApiService, private _router: Router) { }

  ngOnInit(): void {
  }

  registerUser(){
    this._service.registerUserFromRemote(this.user).subscribe(
      data =>{
        console.log("response received")
        this.msg=""
        this.msg1="Registration Successful"
      },
      error => {
        console.log("Exception occured")
        this.msg1=""
        this.msg="Email already exists. Go back to login page to sign in.";
        
      }
    )
  }

}
