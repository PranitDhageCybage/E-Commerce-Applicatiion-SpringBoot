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
  totalAmount: number = 0;

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
      if (response['success']) {
        this.items = response['data'];
        this.totalAmount = 0;
        this.items.forEach(
          (item: any) =>
            (this.totalAmount +=
              item['cart_quantity'] * item['product']['prod_price'])
        );
      }
    });
  }

  updateQuantity(quantity: number, item: any) {
    const newQuantity = item['cart_quantity'] + quantity;
    if (newQuantity == 0) {
      this.onDelete(item);
    } else {
      if (
        item['cart_quantity'] >= item['product']['prod_qty'] &&
        quantity != -1
      ) {
        this.toastr.error('No more product available');
      } else {
        if (item['cart_quantity'] >= 5 && quantity != -1) {
          this.toastr.error('Maximun 5 products can be bought at a time');
        } else {
          this.cartService
            .updateCartItem(item['cart_id'], newQuantity)
            .subscribe((response: any) => {
              if (response['success']) {
                this.toastr.success('Updated quantity');
                this.loadCartItems();
              }
            });
        }
      }
    }
  }

  onDelete(item: any) {
    this.cartService
      .deleteCartItem(item['cart_id'])
      .subscribe((response: any) => {
        if (response['success']) {
          this.ngOnInit();
          this.toastr.success(
            `Deleted ${item['product']['prod_title']} form cart`
          );
        }
      });
  }

  placeOrder() {
    this.router.navigate(['/home/order/preview']);
  }
}
