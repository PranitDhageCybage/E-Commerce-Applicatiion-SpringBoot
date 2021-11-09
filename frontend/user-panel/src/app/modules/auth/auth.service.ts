import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements CanActivate {
  url = 'http://localhost:8080/user';

  constructor(private router: Router, private httpClient: HttpClient) {}

  login(email: string, password: string) {
    const body = {
      email: email,
      password: password,
    };

    return this.httpClient.post(this.url + '/login', body);
  }

  signup(name: string, phone: string, email: string, password: string) {
    const body = {
      name: name,
      phone: phone,
      email: email,
      password: password,
    };
    return this.httpClient.post(this.url + '/signup', body);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (sessionStorage['user']) {
      // user is already logged in
      // launch the component
      return true;
    }
    // force user to login
    this.router.navigate(['/auth/login']);
    // user has not logged in yet
    // stop launching the component
    return false;
  }
}
