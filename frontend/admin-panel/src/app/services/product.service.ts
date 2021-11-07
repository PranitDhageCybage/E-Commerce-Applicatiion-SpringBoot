import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url = 'http://localhost:8080/product';
  constructor(private httpClient: HttpClient) {}

  loadProducts() {
    // Add token in header
    const httpOptions = {
      headers: new HttpHeaders({
        // token: sessionStorage['token'],
      }),
    };
    return this.httpClient.get(this.url + '/list', httpOptions);
  }
  //Get Product Details with Id
  getProduct(id: number) {
    // Add token in header
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token'],
      }),
    };
    console.log('Inside get product by id service');

    return this.httpClient.get(this.url + '/details/' + id, httpOptions);
  }

  toggelActiveStatus(product: any) {
    // Add token in header
    const httpOptions = {
      headers: new HttpHeaders({
        // token: sessionStorage['token'],
      }),
    };
    const is_active = product['is_active'] == 0 ? 1 : 0;
    return this.httpClient.put(
      this.url + `/isActiveStatus/${product['prod_id']}/${is_active}`,
      httpOptions
    );
  }

  deleteProduct(prod_id: number) {
    // Add token in header
    const httpOptions = {
      headers: new HttpHeaders({
        // token: sessionStorage['token'],
      }),
    };

    return this.httpClient.delete(this.url + `/delete/${prod_id}`, httpOptions);
  }

  updateProduct(
    id: number,
    title: string,
    description: string,
    price: number,
    category: number,
    brand: number
  ) {
    // Add token in header
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token'],
      }),
    };
    const body = {
      title: title,
      description: description,
      price: price,
      category: category,
      brand: brand,
    };

    return this.httpClient.put(this.url + '/' + id, body, httpOptions);
  }

  insertProduct(
    title: string,
    description: string,
    price: number,
    category: number,
    brand: number
  ) {
    // Add token in header
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token'],
      }),
    };
    const body = {
      title: title,
      description: description,
      price: price,
      category: category,
      brand: brand,
    };

    return this.httpClient.post(this.url + '/create', body, httpOptions);
  }
  uploadImage(id: number, file: any) {
    // Add token in header
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token'],
      }),
    };
    const body = new FormData();
    body.append('productImage', file);

    return this.httpClient.post(
      this.url + '/upload-image/' + id,
      body,
      httpOptions
    );
  }
}
