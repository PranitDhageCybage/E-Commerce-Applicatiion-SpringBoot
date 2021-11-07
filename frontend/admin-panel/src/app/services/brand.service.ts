import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  url = 'http://localhost:8080/company';
  constructor(private httpClient: HttpClient) {}

  getBrands() {
    // add the token in the request header
    const httpOptions = {
      headers: new HttpHeaders({
        // token: sessionStorage['token'],
      }),
    };
    return this.httpClient.get(this.url + '/list', httpOptions);
  }

  getBrand(compId: string) {
    // add the token in the request header
    const httpOptions = {
      headers: new HttpHeaders({
        // token: sessionStorage['token'],
      }),
    };
    return this.httpClient.get(this.url + '/details/' + compId, httpOptions);
  }

  addBrands(title: string, description: string) {
    // add the token in the request header
    const httpOptions = {
      headers: new HttpHeaders({
        // token: sessionStorage['token'],
      }),
    };
    const body = {
      comp_title: title,
      comp_description: description,
    };
    return this.httpClient.post(this.url + '/add', body, httpOptions);
  }

  updateBrands(comp_id: number, title: string, description: string) {
    // add the token in the request header
    const httpOptions = {
      headers: new HttpHeaders({
        // token: sessionStorage['token'],
      }),
    };
    const body = {
      comp_title: title,
      comp_description: description,
    };
    return this.httpClient.put(
      this.url + '/update/' + comp_id,
      body,
      httpOptions
    );
  }

  deleteBrands(id: number) {
    // add the token in the request header
    const httpOptions = {
      headers: new HttpHeaders({
        // token: sessionStorage['token'],
      }),
    };
    return this.httpClient.delete(this.url + '/delete/' + id, httpOptions);
  }
}
