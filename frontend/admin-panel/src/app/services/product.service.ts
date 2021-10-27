import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url = 'http://localhost:3000/product';
  constructor(private httpClient: HttpClient) {}

  loadProducts() {
    // Add token in header
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token'],
      }),
    };
    return this.httpClient.get(this.url + '/details', httpOptions);
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
        token: sessionStorage['token'],
      }),
    };

    const body = {};
    return this.httpClient.put(
      this.url +
        `/update-state/${product['id']}/${product['isActive'] == 0 ? 1 : 0}`,
      body,
      httpOptions
    );
  }

  deleteProduct(id: number) {
    // Add token in header
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token'],
      }),
    };

    return this.httpClient.delete(this.url + `/${id}`, httpOptions);
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

    return this.httpClient.post(this.url + '/upload-image/' + id, body, httpOptions);
  }
}
