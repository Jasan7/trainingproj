import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../shared/api.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './studentdashboard.component.html',
  styleUrls: ['./studentdashboard.component.css']
})
export class StudentdashboardComponent implements OnInit {

  searchForm !: FormGroup;
  student: any;
  constructor(private formbuilder: FormBuilder, private http: HttpClient, private api: ApiService) { }

  ngOnInit(): void {
    this.searchForm = this.formbuilder.group({
      rollno: ['', Validators.required],
      dob: ['', Validators.required]
    })
    
  }

  search(){
    this.http.get<any>("http://localhost:3000/posts")
    .subscribe(res=>{
      const stu = res.find((a:any)=>{
        return a.rollno === this.searchForm.value.rollno && a.dob === this.searchForm.value.dob
      });
      if(stu){
        this.api.getStudentbyrollno(this.searchForm.value.rollno, this.searchForm.value.dob)
        .subscribe(res=> {
          this.student = res;
        })
        
        this.searchForm.reset();
      }else{
        alert("User not found!");
      }
    },err=>{
      alert("Something went wrong!");
    })
  }

}
