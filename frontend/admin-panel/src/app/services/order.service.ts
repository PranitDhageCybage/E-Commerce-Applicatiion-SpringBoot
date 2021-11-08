import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  url = 'http://localhost:8080/';
  constructor(private httpClient: HttpClient) {}

  getAllUserOrderList() {
    // add the token in the request header
    const httpOptions = {
      headers: new HttpHeaders({
        // token: sessionStorage['token'],
      }),
    };
    return this.httpClient.get(this.url + 'myOrder/list', httpOptions);
  }

  showOrderDetails(id: number) {
    // add the token in the request header
    const httpOptions = {
      headers: new HttpHeaders({
        // token: sessionStorage['token'],
      }),
    };
    return this.httpClient.get(
      this.url + 'orderDetails/list/' + id,
      httpOptions
    );
  }

  changeDeliveryStatus(orderId: number, deliveryStatus: string) {
    // add the token in the request header
    const httpOptions = {
      headers: new HttpHeaders({
        // token: sessionStorage['token'],
      }),
    };

    return this.httpClient.put(
      this.url + '/update/' + orderId + '/' + deliveryStatus,
      httpOptions
    );
  }
}
