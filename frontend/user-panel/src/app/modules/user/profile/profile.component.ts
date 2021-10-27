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
  firstName: string = '';
  lastName: string = '';
  address: string = '';
  city: string = '';
  state: string = '';
  country: string = '';
  zip: string = '';
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
      if (response['status'] == 'success') {
        const user = response['data'][0];
        this.firstName = user['firstName'];
        this.lastName = user['lastName'];
        this.address = user['address'];
        this.city = user['city'];
        this.state = user['state'];
        this.country = user['country'];
        this.zip = user['zip'];
        this.phone = user['phone'];
      } else {
        console.log(response['error']);
      }
    });
  }
  onUpdate() {
    this.userService
      .edituserProfile(
        this.firstName,
        this.lastName,
        this.address,
        this.city,
        this.state,
        this.country,
        this.zip,
        this.phone
      )
      .subscribe((response: any) => {
        if (response['status'] == 'success') {
          this.toastr.success('Profile Updated Successfully');
          this.router.navigate(['/home/product/gallery']);
        } else {
          console.log(response['error']);
        }
      });
  }
}
