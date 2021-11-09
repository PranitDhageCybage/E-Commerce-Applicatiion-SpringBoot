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
  url = 'http://localhost:8080/user';

  constructor(private router: Router, private httpClient: HttpClient) {}

  login(email: string, password: string) {
    const body = {
      email: email,
      password: password,
    };

    return this.httpClient.post(this.url + '/login', body);
  }

  signup(firstName: string, lastName: String, email: string, password: string) {
    const body = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };
    return this.httpClient.post(this.url + '/signup', body);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (sessionStorage['user']) { // Temporary name checked, later check for token
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
