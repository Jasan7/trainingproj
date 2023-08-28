import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Pincode } from 'src/app/class/pincode';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  
  pincode = new Pincode();
  cartForm !: FormGroup
  public products: any = [];
  public total !: number;
  public totalItem:number = 0;
  msg=""
  msg1=""
  msg3: string= ""
  constructor(private formbuilder: FormBuilder,private cartService : CartService, private http: HttpClient) { }

  ngOnInit(): void {
    this.cartForm = this.formbuilder.group({
      pinc:['', Validators.required]
    })

    this.cartService.getProducts()
    .subscribe(res=>{
      this.totalItem = res.length;
    })
    this.cartService.getProducts()
    .subscribe(res=>{
      this.products = res;
      this.total = this.cartService.getTotalPrice();
    })
  }
  removeItem(item: any){
    this.cartService.removeCartItem(item);
  }

  emptycart(){
    this.cartService.removAllCart();
  }

  pincodeCheck(){
    
    this.http.get<any>("http://localhost:8080/pincode")
    this.cartService.pincodecheck(this.pincode)
    .subscribe(
      data =>{
        this.cartService.getPincodebypin(this.cartForm.value.pinc)
        .subscribe(res=>{
          this.pincode = res;
          this.msg3 = this.pincode.ship;
          
        });
        console.log("response received");
        this.msg=""
        this.msg1="Yay! shipping to your region is avalable ";       
      },
      error =>{
        console.log("response denied");
        this.msg1=""
        this.msg3=""
        this.msg="Shipping to your region is currently not available please check out later!"       
      }
    )
  }

}
