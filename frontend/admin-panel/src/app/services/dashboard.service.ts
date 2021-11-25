import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  url = 'http://localhost:8080/admin';
  constructor(private httpClient: HttpClient) {}

  getDashboardTotalCount() {
    // add the token in the request header
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token'],
      }),
    };
    return this.httpClient.get(this.url + '/dashboard-count', httpOptions);
  }
}
