import { ToastrService } from 'ngx-toastr';
import { ProductService } from './../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  cartItems: any = [];
  product: any = [];
  reviews: any = [];
  productId: number = 0;

  title: string = '';
  description: string = '';
  brand: string = '';
  category: string = '';
  price: string = '';
  image: string = 'NoImgAvail.jpg';

  avgRating: number = 1;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private toastr: ToastrService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.params['id'];
    this.loadProductDetails();
    this.loadCartItems();
    this.loadProductReviews();
    this.loadProductAvgRating();
  }

  loadProductDetails() {
    this.productService
      .getProductDetails(this.productId)
      .subscribe((response: any) => {
        if (response['success']) {
          const product = response['data'];
          this.product = product;
          this.title = product['prod_title'];
          this.description = product['prod_description'];
          this.brand = product['company']['comp_title'];
          this.category = product['category']['cat_title'];
          this.price = product['prod_price'];
          this.image = product['photo'];
        } else {
          console.log(response['error']);
        }
      });
  }

  addToCart(product: any) {
    //Check if product id already present in cartItem array
    //If true then navigate user to cart
    if (this.cartItems.includes(product['prod_id'])) {
      this.toastr.success(`${product['prod_title']} present in cart`);
      this.router.navigate(['/home/product/cart']);
    } else {
      // Add item to cart
      this.cartService
        .addCartItem(product['prod_id'])
        .subscribe((response: any) => {
          if (response['success']) {
            this.toastr.success(`Added ${product['prod_title']} to cart`);
            this.loadCartItems();
          }
        });
    }
  }
  loadCartItems() {
    this.cartService.getCartItems().subscribe((response: any) => {
      if (response['success']) {
        // Add product id to cartItem array
        this.cartItems = [];
        response['data'].forEach((item: any) => {
          this.cartItems.push(item['product']['prod_id']);
        });
      } else {
        console.log(response['error']);
      }
    });
  }

  loadProductReviews() {
    this.productService
      .getProductReviews(this.productId)
      .subscribe((response: any) => {
        if (response['success']) {
          this.reviews = response['data'];
        } else {
          console.log(response['error']);
        }
      });
  }
  loadProductAvgRating() {
    this.productService
      .getProductAvgRating(this.productId)
      .subscribe((response: any) => {
        if (response['success']) {
          this.avgRating = response['data'];
        } else {
          console.log(response['error']);
        }
      });
  }
}
