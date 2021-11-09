import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  url: string = 'http://localhost:8080/myOrder';
  rootUrl: string = 'http://localhost:8080';
  user_id = JSON.parse( sessionStorage['user']).user_id
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
        // token: sessionStorage['token'],
      }),
    };

    const body = {
      total_price: totalAmount,
      tax: tax,
      payment_type: paymentType,
      payment_status: paymentStatus,
      delivery_status: deliveryStatus,
      user: { user_id: this.user_id },
      address: { add_id: addressId },
    };
    return this.httpClient.post(this.url + '/checkout', body, httpOptions);
  }

  getMyOrders() {
    // add the token in the request header
    const httpOptions = {
      headers: new HttpHeaders({
        // token: sessionStorage['token'],
      }),
    };
    return this.httpClient.get(this.url + '/list/' + this.user_id, httpOptions);
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
        // token: sessionStorage['token'],
      }),
    };
    return this.httpClient.get(
      this.rootUrl + '/orderDetails/list/' + id,
      httpOptions
    );
  }
}
