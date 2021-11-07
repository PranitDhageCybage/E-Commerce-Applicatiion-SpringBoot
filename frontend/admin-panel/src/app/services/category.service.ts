import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  url = 'http://localhost:8080/category';
  constructor(private httpClient: HttpClient) {}

  getCategories() {
    // add the token in the request header
    const httpOptions = {
      headers: new HttpHeaders({
        // token: sessionStorage['token'],
      }),
    };
    return this.httpClient.get(this.url + '/list', httpOptions);
  }

  getCategory(id: number) {
    // add the token in the request header
    const httpOptions = {
      headers: new HttpHeaders({
        // token: sessionStorage['token'],
      }),
    };
    return this.httpClient.get(this.url + '/details/' + id, httpOptions);
  }

  addCategories(title: string, description: string) {
    // add the token in the request header
    const httpOptions = {
      headers: new HttpHeaders({
        // token: sessionStorage['token'],
      }),
    };
    const body = {
      cat_title: title,
      cat_description: description,
    };
    return this.httpClient.post(this.url + '/add', body, httpOptions);
  }

  updateCategories(id: number, title: string, description: string) {
    // add the token in the request header
    const httpOptions = {
      headers: new HttpHeaders({
        // token: sessionStorage['token'],
      }),
    };
    const body = {
      cat_title: title,
      cat_description: description,
    };
    return this.httpClient.put(this.url + '/update/' + id, body, httpOptions);
  }

  deleteCategories(id: number) {
    // add the token in the request header
    const httpOptions = {
      headers: new HttpHeaders({
        // token: sessionStorage['token'],
      }),
    };
    return this.httpClient.delete(this.url + '/delete/' + id, httpOptions);
  }
}
