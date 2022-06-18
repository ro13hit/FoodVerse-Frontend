import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  baseUrl = "https://localhost:7192/api/cart"
  constructor(private http : HttpClient) { }
  
  public getCart(UserId: number) {
    const requestHeaders = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem("token")}`)
    return this.http.get(this.baseUrl+`/GetCart?id=${UserId}`, {headers: requestHeaders})
  }

  public addToCart(ItemId: number, ItemCount: number, UserId: number) {
    const body = {
      ItemId : ItemId,
      ItemCount: ItemCount,
      UserId: UserId
    }
    const requestHeaders = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem("token")}`)
    return this.http.post(this.baseUrl+'/CreateCart', body, {headers: requestHeaders})
  }

  public deleteFromCart(ItemId: number, UserId: number){
    const body = {ItemId: ItemId, UserId: UserId}
    const requestHeaders = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem("token")}`)
    return this.http.post(this.baseUrl+'/DeleteItemFromCart', body, {headers: requestHeaders});
  }
  
  public updateCart(ItemId: number, ItemCount: number, UserId: number){
    const body = {ItemId: ItemId, ItemCount: ItemCount, UserId: UserId}
    const requestHeaders = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem("token")}`)
    return this.http.post(this.baseUrl+'/UpdateCart', body, {headers: requestHeaders});
  }

  public placeOrder(data: any){
    const requestHeaders = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem("token")}`)
    return this.http.post(this.baseUrl+'/PlaceOrder', data, {headers: requestHeaders});
  }
}
