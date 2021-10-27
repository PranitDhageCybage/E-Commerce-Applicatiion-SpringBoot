import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
})
export class OrderHistoryComponent implements OnInit {
  myOrders: any = [];
  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    this.loadMyOrders();
  }

  loadMyOrders() {
    this.orderService.getMyOrders().subscribe((response: any) => {
      if ((response['status'] = 'success')) {
        this.myOrders = response['data'];
      } else {
        console.log(response['error']);
      }
    });
  }
  onCancel(order: any) {
    this.orderService
      .cancelMyOrders(order['id'], 'Cancelled')
      .subscribe((response: any) => {
        if ((response['status'] = 'success')) {
          this.loadMyOrders();
        } else {
          console.log(response['error']);
        }
      });
  }

}
