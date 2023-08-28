import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  searchKey: string = "";
  public filterCat : any;
  public productList : any;
  constructor(private api: ApiService, private cartService: CartService) { }

  ngOnInit(): void {
    this.api.getProduct()
    .subscribe(res=>{
      this.productList = res;
      this.filterCat = res;
      this.productList.forEach((a:any) => {
        Object.assign(a, {quantity: 1, total: a.pprice})
      });
    });
    this.cartService.search.subscribe((val:any)=>{
      this.searchKey = val;
    })
  }
  

  addtocart(item: any){
    this.cartService.addtoCart(item);
  }

  filter(category: string){
    this.filterCat = this.productList
    .filter((a:any)=>{
      if(a.category == category || category == ''){
        return a;
      }
    })
  }
}
