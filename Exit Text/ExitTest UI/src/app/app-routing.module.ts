import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './component/cart/cart.component';
import { LoginComponent } from './component/login/login.component';
import { ProductsComponent } from './component/products/products.component';
import { RegistrationComponent } from './component/registration/registration.component';

const routes: Routes = [
  {path:'', component:LoginComponent, pathMatch:'full'},
  {path:'login', component:LoginComponent, pathMatch:'full'},
  {path:'dashboard', component:ProductsComponent, pathMatch:'full'},
  {path: 'register', component:RegistrationComponent, pathMatch:'full'},
  {path: 'cart', component:CartComponent, pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
