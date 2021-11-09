import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  onLogin() {
    if (this.email.length == 0) {
      this.toastr.error('please enter email');
    } else if (this.password.length == 0) {
      this.toastr.error('please enter password');
    } else {
      this.authService
        .login(this.email, this.password)
        .subscribe((response: any) => {
          if (response['success']) {
            const data = response['data'];
            sessionStorage['user'] = JSON.stringify(data)
            this.toastr.success(`Welcome ${data['name']} to My Store`);
            // goto the dashboard
            this.router.navigate(['/home/product/gallery']);
          } else {
            this.toastr.success(response['error']);
          }
        });
    }
  }
}
