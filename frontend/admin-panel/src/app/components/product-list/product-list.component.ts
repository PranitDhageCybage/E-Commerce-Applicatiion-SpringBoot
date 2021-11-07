import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: any = [];
  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  addProduct() {
    this.router.navigate(['/product-add']);
  }
  loadProducts() {
    this.productService.loadProducts().subscribe((response: any) => {
      if (response['success']) {
        this.products = response['data'];
      } else {
        console.log(response['error']);
      }
    });
  }
  toggelActiveStatus(product: any) {
    this.productService
      .toggelActiveStatus(product)
      .subscribe((response: any) => {
        if (response['success']) {
          this.loadProducts();
        } else {
          console.log(response['error']);
        }
      });
  }
  onEdit(product: any) {
    this.router.navigate(['/product-add'], {
      queryParams: { id: product['id'] },
    });
  }
  uploadImage(product: any) {
    this.router.navigate(['/product-upload-image'], {
      queryParams: { id: product['id'] },
    });
  }
  onDelete(product: any) {
    this.productService
      .deleteProduct(product['prod_id'])
      .subscribe((response: any) => {
        if (response['success']) {
          this.loadProducts();
        } else {
          console.log(response['error']);
        }
      });
  }
}
