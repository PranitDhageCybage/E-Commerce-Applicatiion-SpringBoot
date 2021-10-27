import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  ngOnInit(): void {}

  constructor(private router: Router) {
    console.log('Inside App Root Component Constructor');
  }

  onLogout() {
    // sessionStorage.removeItem('token');
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
