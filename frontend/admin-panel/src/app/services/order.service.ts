import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  url = 'http://localhost:3000/order';
  constructor(private httpClient: HttpClient) {}

  getUserOrderDetails() {
    // add the token in the request header
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token'],
      }),
    };
    return this.httpClient.get(this.url + '/user-order', httpOptions);
  }

  showOrderDetails(id: number) {
    // add the token in the request header
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token'],
      }),
    };
    return this.httpClient.get(this.url + '/details/' + id, httpOptions);
  }

  changeDeliveryStatus(orderId: number, deliveryStatus: string) {
    // add the token in the request header
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token'],
      }),
    };

    const body = {
      status: deliveryStatus,
    };
    return this.httpClient.put(this.url + '/' + orderId, body, httpOptions);
  }
}
