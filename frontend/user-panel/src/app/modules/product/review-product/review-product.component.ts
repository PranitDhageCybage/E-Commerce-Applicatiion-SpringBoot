import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-review-product',
  templateUrl: './review-product.component.html',
  styleUrls: ['./review-product.component.css'],
})
export class ReviewProductComponent implements OnInit {
  review: string = '';
  rating: number = 1;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  onAddreview() {
    const id = this.activatedRoute.snapshot.queryParams['id'];
    this.productService
      .reviewProduct(id, this.review, this.rating)
      .subscribe((response: any) => {
        if (response['success']) {
          this.toastr.success('Product Review Added Successfully');
          this.router.navigate(['/home/order/order-history']);
        } else {
          console.log(response['error']);
        }
      });
  }
}
