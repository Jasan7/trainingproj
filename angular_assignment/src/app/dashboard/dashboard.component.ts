import { Component, OnInit, ɵɵqueryRefresh } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { StudentModel } from './dashboard.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  formValue !: FormGroup;
  studentmodelObj: StudentModel = new StudentModel();
  studentData: any;
  showAdd : boolean = false;
  showUpdate !: boolean;
  constructor(private formbuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      rollno: [''],
      name: [''],
      dob: [''],
      score: ['']
    })
    this.getAllStudents();
    
  }

  clickAddStudent(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  postStudentDetails(){
    this.studentmodelObj.id = this.formValue.value.id;
    this.studentmodelObj.rollno = this.formValue.value.rollno;
    this.studentmodelObj.name = this.formValue.value.name;
    this.studentmodelObj.dob = this.formValue.value.dob;
    this.studentmodelObj.score = this.formValue.value.score;
    
    
    this.api.postStudent(this.studentmodelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Student Added Successfully");
      let ref = document.getElementById('cancel')
      ref?.click()
      this.formValue.reset();
      this.getAllStudents();
    },
    err=>{
      alert("Something went wrong!");
    })
  }

  getAllStudents(){
    this.api.getStudent()
    .subscribe(res=> {
      this.studentData = res;
    })
  }

  deleteStudent(row : any){
    this.api.deleteStudent(row.id)
    .subscribe(res=>{
      alert("Student Deleted")
      this.getAllStudents()
    })
  }
  edit(row: any){
    this.showAdd = false;
    this.showUpdate = true;
    this.studentmodelObj.id = row.id
    this.formValue.controls['rollno'].setValue(row.rollno);
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['dob'].setValue(row.dob);
    this.formValue.controls['score'].setValue(row.score);
    
  }

  updateStudentDetails(){
    this.studentmodelObj.rollno = this.formValue.value.rollno;
    this.studentmodelObj.name = this.formValue.value.name;
    this.studentmodelObj.dob = this.formValue.value.dob;
    this.studentmodelObj.score = this.formValue.value.score;
    this.api.updateStudent(this.studentmodelObj, this.studentmodelObj.id)
    .subscribe(res=>{
      alert("Updated Successfully")
      let ref = document.getElementById('cancel')
      ref?.click()
      this.formValue.reset();
      this.getAllStudents();
    })
    
  }

}
