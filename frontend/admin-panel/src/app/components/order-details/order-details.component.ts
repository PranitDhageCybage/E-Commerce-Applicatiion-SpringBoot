import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit {
  orderdetails: any = [];
  constructor(
    private router: Router,
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getOrderDetails();
  }

  getOrderDetails() {
    const id = this.activatedRoute.snapshot.queryParams['id'];
    this.orderService.showOrderDetails(id).subscribe((response: any) => {
      if (response['status'] == 'success') {
        this.orderdetails = response['data'];
      } else {
        console.log(response['error']);
      }
    });
  }
}
