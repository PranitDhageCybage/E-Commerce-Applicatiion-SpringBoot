import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../order.service';

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
    const id = this.activatedRoute.snapshot.params.id;
    this.orderService.showOrderDetails(id).subscribe((response: any) => {
      if (response['success']) {
        this.orderdetails = response['data'];
      } else {
        console.log(response['error']);
      }
    });
  }
  onReviewProduct(order: any) {
    this.router.navigate(['/home/product/review'], {
      queryParams: { id: order['product']['prod_id'] },
    });
  }
}
