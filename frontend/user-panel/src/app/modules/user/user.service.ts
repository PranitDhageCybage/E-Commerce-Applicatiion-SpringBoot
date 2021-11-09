import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url: string = 'http://localhost:8080/user';
  rootUrl: string = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {}

  getUserDetails() {
    // add the token in the request header
    const httpOptions = {
      headers: new HttpHeaders({
        // token: sessionStorage['token'],
      }),
    };
    const id = sessionStorage['user_id'];

    return this.httpClient.get(this.url + '/profile/' + id, httpOptions);
  }

  edituserProfile(name: string, email: string, phone: string) {
    // add the token in the request header
    const httpOptions = {
      headers: new HttpHeaders({
        // token: sessionStorage['token'],
      }),
    };

    const body = {
      name: name,
      email: email,
      phone: phone,
    };
    const id = sessionStorage['user_id'];
    return this.httpClient.put(
      this.url + '/UpdateProfile/' + id,
      body,
      httpOptions
    );
  }

  getAddress() {
    // add the token in the request header
    const httpOptions = {
      headers: new HttpHeaders({
        // token: sessionStorage['token'],
      }),
    };
    const id = sessionStorage['user_id'];
    return this.httpClient.get(
      this.rootUrl + '/address/list/' + id,
      httpOptions
    );
  }

  addAddress(
    address: string,
    city: string,
    state: string,
    country: string,
    pin: string
  ) {
    // add the token in the request header
    const httpOptions = {
      headers: new HttpHeaders({
        // token: sessionStorage['token'],
      }),
    };

    const body = {
      address: address,
      city: city,
      state: state,
      country: country,
      pin: pin,
      user: {
        user_id: sessionStorage['user_id'],
      },
    };

    return this.httpClient.post(
      this.rootUrl + '/address/add',
      body,
      httpOptions
    );
  }

  deleteAddress(id: number) {
    // add the token in the request header
    const httpOptions = {
      headers: new HttpHeaders({
        // token: sessionStorage['token'],
      }),
    };

    return this.httpClient.delete(
      this.rootUrl + '/address/delete/' + id,
      httpOptions
    );
  }
}
