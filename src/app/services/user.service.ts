import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'https://localhost:7192/api/users'
  constructor(private http: HttpClient) { }

  public login(email: string, password: string)
  {
    const body = {
      Email: email,
      Password : password
    }
    return this.http.post(this.baseUrl+'/SignIn',body);
  }

  public signUp(firstName: string, lastName:string, email: string, password: string,phone : number, address: string)
  {
    const body = {
      FirstName : firstName,
      LastName : lastName,
      Email : email,
      Password : password,
      Phone : phone,
      Address: address
    }
    return this.http.post(this.baseUrl+'/SignUp', body);
  }

  public CheckEmailPhone(match: string)
  {
    return this.http.post(this.baseUrl+'/UniqueCheck?value='+match,{});
  }

  public isLoggedIn()
  {
    const check = localStorage.getItem("token");
    if(check!==null)
    {
      return true;
    }
    return false;
  }

  public SignOut()
  {
    localStorage.removeItem("token");
  }

  public getUser(){
    const requestHeaders = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem("token")}`)
    let email = localStorage.getItem("email")
    const body = {Email: email}
    return this.http.post(this.baseUrl+"/GetUser", body, {headers:requestHeaders});
  }
}
