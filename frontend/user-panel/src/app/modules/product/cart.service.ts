import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  url = 'http://localhost:8080/cart';
  user_id = JSON.parse(sessionStorage['user']).id;
  constructor(private httpClient: HttpClient) {}

  getCartItems() {
    // add the token in the request header
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token'],
      }),
    };
    return this.httpClient.get(this.url + '/list/' + this.user_id, httpOptions);
  }

  deleteCartItem(id: number) {
    // add the token in the request header
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token'],
      }),
    };

    return this.httpClient.delete(this.url + '/delete/' + id, httpOptions);
  }

  updateCartItem(id: number, quantity: number) {
    // add the token in the request header
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token'],
      }),
    };
    const body = {};
    return this.httpClient.put(
      this.url + `/update?cart_id=${id}&cart_quantity=${quantity}`,
      body,
      httpOptions
    );
  }

  addCartItem(productId: number) {
    // add the token in the request header
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token'],
      }),
    };
    const body = {
      user: { user_id: this.user_id },
      product: { prod_id: productId },
    };

    return this.httpClient.post(this.url + '/add', body, httpOptions);
  }
}
