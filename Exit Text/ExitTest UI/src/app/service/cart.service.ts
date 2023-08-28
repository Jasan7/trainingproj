import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Pincode } from '../class/pincode';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList: any = []
  public search = new BehaviorSubject<string>("");
  public productList = new BehaviorSubject<any>([]);

  constructor(private http : HttpClient) { }
  getProducts(){
    return this.productList.asObservable();
  }

  setProduct(product: any){
    this.cartItemList.push(...product);
    this.productList.next(product);
  }

  addtoCart(product: any){
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
    console.log(this.cartItemList);
  }

  getTotalPrice() : number{
    let gtotal = 0;
    this.cartItemList.map((a: any)=>{
      gtotal += a.total;
    })
    return gtotal;
  }

  removeCartItem(product: any){
    this.cartItemList.map((a:any, index: any)=>{
      if(product.id === a.id){
        this.cartItemList.splice(index, 1);
      }
    })
    this.productList.next(this.cartItemList);
  }

  removAllCart(){
    this.cartItemList = []
    this.productList.next(this.cartItemList);
  }

  public pincodecheck(pincode : Pincode): Observable<any>{
    return this.http.post("http://localhost:8080/pincode", pincode)
  }

  getPincodebypin(pin: number){
    return this.http.get<any>("http://localhost:8080/pincode/"+pin)

  }

}
