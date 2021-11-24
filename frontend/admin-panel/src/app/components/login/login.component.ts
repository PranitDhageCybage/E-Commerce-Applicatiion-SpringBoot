import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private adminService: AdminService) {}

  ngOnInit(): void {}

  onLogin() {
    this.adminService
      .login(this.username, this.password)
      .subscribe((response: any) => {
        if (response['success']) {
          const data = response['data'];
          sessionStorage['user'] = JSON.stringify(data);
          sessionStorage['token'] = data['token'];
          this.router.navigate(['/dashboard']);
        } else {
          alert(response['error'] + '\n' + response['data']);
        }
      });
  }
}
