import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';

@Component({
  selector: 'app-address-add',
  templateUrl: './address-add.component.html',
  styleUrls: ['./address-add.component.css'],
})
export class AddressAddComponent implements OnInit {
  address: string = '';
  city: string = '';
  state: string = '';
  country: string = '';
  pin: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}
  onAdd() {
    this.userService
      .addAddress(this.address, this.city, this.state, this.country, this.pin)
      .subscribe((response: any) => {
        if (response['success']) {
          this.toastr.success('Address Added Successfully');
          this.router.navigate(['/home/user/address-list']);
        } else {
          console.log(response['error']);
        }
      });
  }
}
