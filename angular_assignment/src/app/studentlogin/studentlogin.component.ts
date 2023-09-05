import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './studentlogin.component.html',
  styleUrls: ['./studentlogin.component.css']
})
export class StudentloginComponent implements OnInit {

  public stuloginForm !: FormGroup
  constructor(private formbuilder: FormBuilder, private http: HttpClient,private router: Router ) { }

  ngOnInit(): void {
    this.stuloginForm = this.formbuilder.group({
      email:[''],
      password:['']
    })
  }

  login(){
    this.http.get<any>("http://localhost:3000/students")
    .subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.email === this.stuloginForm.value.email && a.password === this.stuloginForm.value.password
      });
      if(user){
        alert("Login Successful!");
        this.stuloginForm.reset();
        this.router.navigate(['studentdashboard'])
      }else{
        alert("User not found!");
      }
    },err=>{
      alert("Something went wrong!");
    })
  }
}
