import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  url = 'http://localhost:8080/cart';

  constructor(private httpClient: HttpClient) {}

  getCartItems() {
    // add the token in the request header
    const httpOptions = {
      headers: new HttpHeaders({
        // token: sessionStorage['token']
      }),
    };
    const id = sessionStorage['user_id'];
    return this.httpClient.get(this.url + '/list/' + id, httpOptions);
  }

  deleteCartItem(id: number) {
    // add the token in the request header
    const httpOptions = {
      headers: new HttpHeaders({
        // token: sessionStorage['token'],
      }),
    };

    return this.httpClient.delete(this.url + '/delete/' + id, httpOptions);
  }

  updateCartItem(id: number, quantity: number) {
    // add the token in the request header
    const httpOptions = {
      headers: new HttpHeaders({
        // token: sessionStorage['token'],
      }),
    };

    return this.httpClient.put(
      this.url + '/update/' + id + '/' + quantity,
      httpOptions
    );
  }

  addCartItem(productId: number) {
    // add the token in the request header
    const httpOptions = {
      headers: new HttpHeaders({
        //  token: sessionStorage['token']
      }),
    };
    const body = {
      user: { user_id: sessionStorage['user_id'] },
      product: { prod_id: productId },
    };

    return this.httpClient.post(this.url + '/add', body, httpOptions);
  }
}
