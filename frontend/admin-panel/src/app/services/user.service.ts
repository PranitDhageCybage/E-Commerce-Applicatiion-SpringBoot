import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = 'http://localhost:8080/admin';
  constructor(private httpClient: HttpClient) {}

  getUsers() {
    //Add token in request header
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token'],
      }),
    };
    return this.httpClient.get(this.url + '/userList', httpOptions);
  }
  toggelActiveStatus(user: any) {
    //Add token in request header
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token'],
      }),
    };

    const status = user['status'] == 1 ? 0 : 1;

    return this.httpClient.put(
      this.url + '/userStatus/' + user['user_id'] + '/' + status,
      httpOptions
    );
  }
}
