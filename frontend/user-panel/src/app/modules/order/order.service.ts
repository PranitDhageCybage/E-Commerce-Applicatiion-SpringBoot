import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  url: string = 'http://localhost:8080/myOrder';
  constructor(private httpClient: HttpClient) {}

  placeOrder(
    addressId: number,
    totalAmount: number,
    tax: number,
    paymentType: string,
    paymentStatus: string,
    deliveryStatus: string
  ) {
    // add the token in the request header
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token'],
      }),
    };

    const body = {
      addressId: addressId,
      totalAmount: totalAmount,
      tax: tax,
      paymentType: paymentType,
      paymentStatus: paymentStatus,
      deliveryStatus: deliveryStatus,
    };

    console.log(body);

    return this.httpClient.post(this.url, body, httpOptions);
  }

  getMyOrders() {
    // add the token in the request header
    const httpOptions = {
      headers: new HttpHeaders({
        // token: sessionStorage['token'],
      }),
    };
    const id = sessionStorage['user_id'];
    return this.httpClient.get(this.url + '/list/' + id, httpOptions);
  }

  cancelMyOrders(id: number, status: string) {
    // add the token in the request header
    const httpOptions = {
      headers: new HttpHeaders({
        // token: sessionStorage['token'],
      }),
    };
    return this.httpClient.put(
      this.url + '/update/' + id + '/' + status,
      httpOptions
    );
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
}
