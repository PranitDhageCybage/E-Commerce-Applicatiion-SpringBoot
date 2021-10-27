import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  items = [];
  totalAmount = 0;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private cartService: CartService
  ) {}

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

  updateQuantity(quantity: number, item: any) {
    const newQuantity = item['quantity'] + quantity;
    if (newQuantity == 0) {
      this.onDelete(item);
    } else {
      this.cartService
        .updateCartItem(item['id'], newQuantity, item['price'])
        .subscribe((response: any) => {
          if (response['status'] == 'success') {
            this.toastr.success('Updated quantity');
            this.loadCartItems();
          }
        });
    }
  }

  onDelete(item: any) {
    this.cartService.deleteCartItem(item['id']).subscribe((response: any) => {
      if (response['status'] == 'success') {
        this.toastr.success(`Deleted ${item['title']} form cart`);
        this.loadCartItems();
      }
    });
  }

  placeOrder() {
    this.router.navigate(['/home/order/preview']);
  }
}
