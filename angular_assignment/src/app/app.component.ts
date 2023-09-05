import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-project';
  name = "assignment 6"

  getName(){
    return this.name;
  }

  obj = {
    name:"jasan",
    age:22
  }

}
