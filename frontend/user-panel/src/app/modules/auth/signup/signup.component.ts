import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  name: string = '';
  phone: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    console.log('Inside Sign Up Component');
  }

  ngOnInit(): void {}

  onSignup() {
    this.authService
      .signup(this.name, this.phone, this.email, this.password)
      .subscribe((response: any) => {
        if (response['success']) {
          this.toastr.success('Signed Up Successfully. Login to Continue');
          this.router.navigate(['/auth/login']);
        } else {
          this.toastr.error(response['error']);
        }
      });
  }
}
