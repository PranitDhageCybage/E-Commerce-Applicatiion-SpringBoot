import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  url = 'http://localhost:3000/category';
  constructor(private httpClient: HttpClient) {}

  getCategories() {
    // add the token in the request header
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token'],
      }),
    };
    return this.httpClient.get(this.url, httpOptions);
  }

  getCategory(id: number) {
    // add the token in the request header
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token'],
      }),
    };
    return this.httpClient.get(this.url + '/' + id, httpOptions);
  }

  addCategories(title: string, description: string) {
    // add the token in the request header
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token'],
      }),
    };
    const body = {
      title: title,
      description: description,
    };
    return this.httpClient.post(this.url, body, httpOptions);
  }

  updateCategories(id: number, title: string, description: string) {
    // add the token in the request header
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token'],
      }),
    };
    const body = {
      title: title,
      description: description,
    };
    return this.httpClient.put(this.url + '/' + id, body, httpOptions);
  }

  deleteCategories(id: number) {
    // add the token in the request header
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token'],
      }),
    };
    return this.httpClient.delete(this.url + '/' + id, httpOptions);
  }
}
