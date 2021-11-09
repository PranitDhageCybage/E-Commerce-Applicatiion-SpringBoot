import { ToastrService } from 'ngx-toastr';
import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  name: string = '';
  email: string = '';
  phone: string = '';

  constructor(
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.userService.getUserDetails().subscribe((response: any) => {
      if (response['success']) {
        const user = response['data'];
        this.name = user['name'];
        this.phone = user['phone'];
        this.email = user['email'];
      } else {
        console.log(response['error']);
      }
    });
  }
  onUpdate() {
    this.userService
      .edituserProfile(this.name, this.email, this.phone)
      .subscribe((response: any) => {
        if (response['success']) {
          this.toastr.success('Profile Updated Successfully');
          this.router.navigate(['/home/product/gallery']);
        } else {
          console.log(response['error']);
        }
      });
  }
}
