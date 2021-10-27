import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = 'http://localhost:3000/user';
  constructor(private httpClient: HttpClient) {}

  getUsers() {
    //Add token in request header
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token'],
      }),
    };
    return this.httpClient.get(this.url, httpOptions);
  }
  toggelActiveStatus(user: any) {
    //Add token in request header
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token'],
      }),
    };
    const body = {
      status: user['active'] == 1 ? 0 : 1,
    };

    return this.httpClient.put(
      this.url + '/toggle-active/' + user['id'],
      body,
      httpOptions
    );
  }
}
