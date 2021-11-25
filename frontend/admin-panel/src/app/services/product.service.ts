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
        token: sessionStorage['token'],
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
    const is_active = product['is_active'] == 0 ? 1 : 0;
    return this.httpClient.put(
      this.url + `/isActiveStatus/${product['prod_id']}/${is_active}`,
      body,
      httpOptions
    );
  }

  deleteProduct(prod_id: number) {
    // Add token in header
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token'],
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
    brand: number,
    quantity: number
  ) {
    // Add token in header
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token'],
      }),
    };
    const body = {
      prod_title: title,
      prod_description: description,
      prod_price: price,
      category: { cat_id: category },
      company: { comp_id: brand },
      prod_qty: quantity,
    };

    return this.httpClient.put(this.url + '/update/' + id, body, httpOptions);
  }

  insertProduct(
    title: string,
    description: string,
    price: number,
    category: number,
    brand: number,
    quantity: number
  ) {
    // Add token in header
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token'],
      }),
    };
    const body = {
      prod_title: title,
      prod_description: description,
      prod_price: price,
      category: { cat_id: category },
      company: { comp_id: brand },
      prod_qty: quantity,
    };

    return this.httpClient.post(this.url + '/add', body, httpOptions);
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

    return this.httpClient.put(
      this.url + '/uploadImage/' + id,
      body,
      httpOptions
    );
  }
}
