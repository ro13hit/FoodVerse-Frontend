import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  baseUrl = "https://localhost:7192/api/Item/"
  constructor(private http: HttpClient) { }

  public getItems()
  {
    return this.http.get(this.baseUrl+'GetItems');
  }

  public getItemById(ItemId: number) {
    const requestHeaders = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem("token")}`)
    return this.http.post(this.baseUrl+`GetItem/${ItemId}`,{},{headers: requestHeaders})
  }

  sendRequest(url: string, method = 'GET', data: any = {}): any {
    const requestHeaders = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem("token")}`)
    let result :any;
    switch (method) {
      case 'GET':
        result = this.http.get(url);
        break;
      case 'PATCH':
        data.values = JSON.parse(data.values)
        let updateBody =[]
        for (const property in data.values) {
          if(property == "image")
          {
            updateBody.push({
              "path": "image",
              "op": "replace",
              "value": Object.values(data.values.image[0])
            })
          }
          else
          {
            updateBody.push({
              "path": `${property}`,
              "op": "replace",
              "value": `${data.values[property]}`
            });
          }
        }
        result = this.http.patch(url+`/${data.key}`, updateBody, {headers: requestHeaders});
        break;
      case 'POST':  
        data.values = JSON.parse(data.values)
        let newBody = {"Name": data.values.name, "Description": data.values.description, "Price": data.values.price, "Quantity":data.values.quantity, "CategoryId": data.values.categoryId,"IsAvailable": 1}
        if(data.values.image!=null)
        {
          Object.assign(newBody,{"Image":Object.values(data.values.image[0])})
        }
        result = this.http.post(url, newBody, {headers: requestHeaders});
        break;
      case 'DELETE':
        result = this.http.delete(url+`/${data.key}`, {headers: requestHeaders});
        break;
    }

    return result
      .toPromise()
      .then((data: any) =>  (method === 'GET' ? data.value : data))
      .catch((e: any) => {
        console.log(e)
      });
  }
}
