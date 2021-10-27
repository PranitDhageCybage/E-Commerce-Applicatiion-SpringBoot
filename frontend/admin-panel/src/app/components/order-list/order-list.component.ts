import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent implements OnInit {
  userOrders: any = [];
  deliveryStatus: string = '';
  constructor(private router: Router, private orderService: OrderService) {}

  ngOnInit(): void {
    this.getUserOrderDetails();
  }

  getUserOrderDetails() {
    this.orderService.getUserOrderDetails().subscribe((response: any) => {
      if (response['status'] == 'success') {
        this.userOrders = response['data'];
      } else {
        console.log(response['error']);
      }
    });
  }

  showOrderDetails(order: any) {
    this.router.navigate(['/order-details'], {
      queryParams: { id: order['id'] },
    });
  }
  changeDeliveryStatus(orderId: number, event: any) {
    this.deliveryStatus = event.target.value;
    this.orderService
      .changeDeliveryStatus(orderId, this.deliveryStatus)
      .subscribe((response: any) => {
        if (response['status'] == 'success') {
          this.getUserOrderDetails();
        } else {
          console.log(response['error']);
        }
      });
  }
}
