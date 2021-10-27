import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private router: Router, private adminService: AdminService) {}

  ngOnInit(): void {}

  onLogin() {
    this.adminService.login(this.email, this.password).subscribe((response : any) => {
      if (response['status'] == 'success') {
        const data = response['data'];
        console.log(data);
        sessionStorage['token'] = data['token']
        sessionStorage['firstName'] = data['firstName']
        sessionStorage['lastName'] = data['lastName']

        this.router.navigate(['/dashboard'])
      } else {
        alert('Invalid User Id or Password');
      }
    });
  }
}
