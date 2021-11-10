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
    this.getAllUserOrderList();
  }

  getAllUserOrderList() {
    this.orderService.getAllUserOrderList().subscribe((response: any) => {
      if (response['success']) {
        this.userOrders = response['data'];
      } else {
        console.log(response['error']);
      }
    });
  }

  showOrderDetails(order: any) {
    this.router.navigate(['/order-details'], {
      queryParams: { id: order['myorder_id'] },
    });
  }
  changeDeliveryStatus(orderId: number, event: any) {
    this.deliveryStatus = event.target.value;
    this.orderService
      .changeDeliveryStatus(orderId, this.deliveryStatus)
      .subscribe((response: any) => {
        if (response['success']) {
          this.getAllUserOrderList();
        } else {
          console.log(response['error']);
        }
      });
  }

  onDelete(order: any) {
    this.orderService
      .deleteMyOrders(order['myorder_id'])
      .subscribe((response: any) => {
        if ((response['success'])) {
          this.getAllUserOrderList();
        } else {
          console.log(response['error']);
        }
      });
  }

}
