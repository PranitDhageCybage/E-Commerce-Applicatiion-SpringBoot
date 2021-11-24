import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminService implements CanActivate {
  url = 'http://localhost:8080/api/auth';

  constructor(private router: Router, private httpClient: HttpClient) {}

  login(username: string, password: string) {
    const body = {
      username: username,
      password: password,
    };

    return this.httpClient.post(this.url + '/signin', body);
  }

  signup(username: string, phone: String, email: string, password: string) {
    const body = {
      username: username,
      phone: phone,
      email: email,
      password: password,
      role: ['admin'],
    };
    return this.httpClient.post(this.url + '/signup', body);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (sessionStorage['token']) {
      // user is already logged in
      // launch the component
      return true;
    }

    // force user to login
    this.router.navigate(['/login']);

    // user has not logged in yet
    // stop launching the component
    return false;
  }
}
