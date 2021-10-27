import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url = 'http://localhost:4000/category'

  constructor(
    private httpClient: HttpClient) { }
  
  getCategories() {
     // add the token in the request header
     const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token']
      })
    };
    
    return this.httpClient.get(this.url, httpOptions)
  }
}
