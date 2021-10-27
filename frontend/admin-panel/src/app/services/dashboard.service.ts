import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  url = 'http://localhost:3000/dashboard';
  constructor(private httpClient: HttpClient) {}

  getDashboardTotalCount() {
    // add the token in the request header
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token'],
      }),
    };
    return this.httpClient.get(this.url + '/all-count', httpOptions);
  }
  // getUserCount() {
  //   // add the token in the request header
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       token: sessionStorage['token'],
  //     }),
  //   };
  //   return this.httpClient.get(this.url + '/user-count', httpOptions);
  // }

  // getProductCount() {
  //   // add the token in the request header
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       token: sessionStorage['token'],
  //     }),
  //   };
  //   return this.httpClient.get(this.url + '/product-count', httpOptions);
  // }

  // getOrderCount() {
  //   // add the token in the request header
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       token: sessionStorage['token'],
  //     }),
  //   };
  //   return this.httpClient.get(this.url + '/order-count', httpOptions);
  // }

  // getActiveOrderCount() {
  //   // add the token in the request header
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       token: sessionStorage['token'],
  //     }),
  //   };
  //   return this.httpClient.get(this.url + '/active-order-count', httpOptions);
  // }
  // getCategoriesCount() {
  //   // add the token in the request header
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       token: sessionStorage['token'],
  //     }),
  //   };
  //   return this.httpClient.get(this.url + '/category-count', httpOptions);
  // }

  // getBrandsCount() {
  //   // add the token in the request header
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       token: sessionStorage['token'],
  //     }),
  //   };
  //   return this.httpClient.get(this.url + '/brand-count', httpOptions);
  // }
}
