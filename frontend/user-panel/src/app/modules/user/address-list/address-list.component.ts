import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../../order/order.service';
import { CartService } from '../../product/cart.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css'],
})
export class AddressListComponent implements OnInit {
  addresses: any = [];
  cartItems: any = [];
  selectedAddress: number = 1;

  totalAmount: number = 0;
  tax: number = 0;
  paymentType: string = 'Card';
  paymentStatus: string = 'Success';
  deliveryStatus: string = 'Pending';

  constructor(
    private router: Router,
    private userService: UserService,
    private orderService: OrderService,
    private cartService: CartService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadAddress();
    this.loadCart();
  }

  loadAddress() {
    this.userService.getAddress().subscribe((response: any) => {
      if (response['success']) {
        this.addresses = response['data'];
      } else {
        console.log(response['error']);
      }
    });
  }

  loadCart() {
    this.cartService.getCartItems().subscribe((response: any) => {
      if (response['success']) {
        this.cartItems = response['data'];
        this.totalAmount = 0;
        this.cartItems.forEach(
          (item: any) =>
            (this.totalAmount +=
              item['cart_quantity'] * item['product']['prod_price'])
        );
        this.tax = this.totalAmount / 20;
      }
    });
  }

  onSelectAddress(event: any) {
    this.selectedAddress = event.target.value;
  }

  onSelectPaymentType(event: any) {
    this.paymentType = event.target.value;
  }
  onSelectPaymentStatus(event: any) {
    this.paymentStatus = event.target.value;
  }

  onDelete(address: any) {
    this.userService.deleteAddress(address['add_id']).subscribe((response: any) => {
      if (response['success']) {
        this.loadAddress();
      } else {
        console.log(response['error']);
      }
    });
  }

  placeOrder() {
    this.orderService
      .placeOrder(
        this.selectedAddress,
        this.totalAmount,
        this.tax,
        this.paymentType,
        this.paymentStatus,
        this.deliveryStatus
      )
      .subscribe((response: any) => {
        if (response['success']) {
          this.toastr.success('Order Placed Successfully');
          this.router.navigate(['/home/order/order-history']);
        } else {
          console.log(response['error']);
        }
      });
  }
}
