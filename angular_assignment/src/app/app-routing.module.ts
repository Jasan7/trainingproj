import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { StudentdashboardComponent } from './studentdashboard/studentdashboard.component';
import { StudentloginComponent } from './studentlogin/studentlogin.component';

const routes: Routes = [
  {path:'', redirectTo:'signup', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'studentlogin', component:StudentloginComponent},
  {path:'studentdashboard', component:StudentdashboardComponent},
  {path:'signup', component:SignupComponent},
  {path:"dashboard", component:DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
