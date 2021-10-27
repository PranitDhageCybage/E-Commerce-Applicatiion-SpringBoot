import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../product/cart.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css'],
})
export class PreviewComponent implements OnInit {
  items: any = [];
  totalAmount: number = 0;
  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.loadCartItems();
  }
  loadCartItems() {
    this.cartService.getCartItems().subscribe((response: any) => {
      if (response['status'] == 'success') {
        this.items = response['data'];
        this.totalAmount = 0;
        for (let index = 0; index < this.items.length; index++) {
          const item = this.items[index];
          this.totalAmount += parseFloat(item['totalAmount']);
        }
      }
    });
  }
  placeOrder() {
    this.router.navigate(['/home/user/address-list']);
  }
}
