import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url: string = 'http://localhost:4000';
  constructor(private httpClient: HttpClient) {}

  getUserDetails() {
    // add the token in the request header
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token'],
      }),
    };

    return this.httpClient.get(this.url + '/user', httpOptions);
  }

  edituserProfile(
    firstName: string,
    lastName: string,
    address: string,
    city: string,
    state: string,
    country: string,
    zip: string,
    phone: string
  ) {
    // add the token in the request header
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token'],
      }),
    };

    const body = {
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      state: state,
      country: country,
      zip: zip,
      phone: phone,
    };

    return this.httpClient.put(
      this.url + '/user/edit-profile',
      body,
      httpOptions
    );
  }

  getAddress() {
    // add the token in the request header
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token'],
      }),
    };

    return this.httpClient.get(this.url + '/address', httpOptions);
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
        token: sessionStorage['token'],
      }),
    };

    const body = {
      address: address,
      city: city,
      state: state,
      country: country,
      pin: pin,
    };

    return this.httpClient.post(this.url + '/address', body, httpOptions);
  }

  deleteAddress(id: number) {
    // add the token in the request header
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token'],
      }),
    };

    return this.httpClient.delete(this.url + '/address/' + id, httpOptions);
  }
}
