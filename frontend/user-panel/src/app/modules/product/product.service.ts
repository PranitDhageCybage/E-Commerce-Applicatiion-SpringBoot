import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url = 'http://localhost:8080/product';
  rootUrl = 'http://localhost:8080';
  user_id = JSON.parse( sessionStorage['user']).id
  constructor(private httpClient: HttpClient) {}

  getProducts() {
    // add the token in the request header
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token'],
      }),
    };

    return this.httpClient.get(this.url + '/galleryList', httpOptions);
  }

  getProductDetails(id: number) {
    // add the token in the request header
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token'],
      }),
    };

    return this.httpClient.get(this.url + '/details/' + id, httpOptions);
  }

  reviewProduct(id: number, review: string, rating: number) {
    // add the token in the request header
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token'],
      }),
    };

    const body = {
      review: review,
      rating: rating,
      product: { prod_id: id },
      user: { user_id: this.user_id },
    };

    return this.httpClient.post(
      this.rootUrl + '/review/add',
      body,
      httpOptions
    );
  }

  getProductReviews(id: number) {
    // add the token in the request header
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token'],
      }),
    };

    return this.httpClient.get(
      this.rootUrl + '/review/list/' + id,
      httpOptions
    );
  }

  getProductAvgRating(id: number) {
    // add the token in the request header
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token'],
      }),
    };

    return this.httpClient.get(
      this.rootUrl + '/review/average/' + id,
      httpOptions
    );
  }
}
