import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class CategoryData 
{
  CategoryId!: number;
  Name!: string;
  Description! : string;
}

@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  constructor(private http: HttpClient) { }

  getCategoryWithItems(){
    return this.http.get("https://localhost:7192/api/Category/GetCategoriesWithItems")
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
        let updateBody = []
        for (const property in data.values) {
          updateBody.push({
            "path": `${property}`,
            "op": "replace",
            "value": `${data.values[property]}`
          });
        }
        result = this.http.patch(url+`/${data.key}`, updateBody, {headers: requestHeaders});
        break;
      case 'POST':  
        data.values = JSON.parse(data.values)
        let newBody = {"Name": data.values.name, "Description": data.values.description}
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
