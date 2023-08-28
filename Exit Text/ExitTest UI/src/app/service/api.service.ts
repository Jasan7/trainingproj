import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../class/user';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http : HttpClient) { }

  public loginUserFromRemote(user: User):Observable<any>{
    return this._http.post<any>("http://localhost:8080/login", user)
  }

  public registerUserFromRemote(user: User):Observable<any>{
    return this._http.post<any>("http://localhost:8080/registerUser", user)
  }

  getProduct(){
    return this._http.get<any>("http://localhost:8080/products")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
