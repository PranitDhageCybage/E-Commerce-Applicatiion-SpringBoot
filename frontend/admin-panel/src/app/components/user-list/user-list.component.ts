import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe((response: any) => {
      if (response['status'] == 'success') {
        this.users = response['data'];
      } else {
        console.log(response['error']);
      }
    });
  }

  toggleActive(user: any) {
    this.userService.toggelActiveStatus(user).subscribe((response: any) => {
      if (response['status'] == 'success') {
        this.loadUsers();
      } else {
        console.log(response['error']);
      }
    });
  }
}
