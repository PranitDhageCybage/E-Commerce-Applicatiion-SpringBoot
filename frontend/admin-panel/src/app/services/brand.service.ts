import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  url = 'http://localhost:3000/brand';
  constructor(private httpClient: HttpClient) {}

  getBrands() {
    // add the token in the request header
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token'],
      }),
    };
    return this.httpClient.get(this.url, httpOptions);
  }

  getBrand(id: string) {
    // add the token in the request header
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token'],
      }),
    };
    return this.httpClient.get(this.url + '/' + id, httpOptions);
  }

  addBrands(title: string, description: string) {
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

  updateBrands(id: number, title: string, description: string) {
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

  deleteBrands(id: number) {
    // add the token in the request header
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token'],
      }),
    };
    return this.httpClient.delete(this.url + '/' + id, httpOptions);
  }
}
