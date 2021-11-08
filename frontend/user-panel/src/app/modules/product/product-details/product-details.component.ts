import { ToastrService } from 'ngx-toastr';
import { ProductService } from './../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { GalleryComponent } from '../gallery/gallery.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  cartItems: any = [];
  product: any = [];
  reviews: any = [];
  productId: number = this.activatedRoute.snapshot.params['id'];

  title: string = '';
  description: string = '';
  brand: string = '';
  category: string = '';
  price: string = '';
  image: string = '51c852c87bff61427aeffa0906afd1be'; //Dummy Image to avoid 404

  avgRating: number = 1;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private toastr: ToastrService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadProductDetails();
    this.loadCartItems();
    this.loadProductReviews();
    this.loadProductAvgRating();
  }

  loadProductDetails() {
    this.productService
      .getProductDetails(this.productId)
      .subscribe((response: any) => {
        if (response['status'] == 'success') {
          const product = response['data'][0];
          this.product = product;
          this.title = product['title'];
          this.description = product['description'];
          this.brand = product['brand']['title'];
          this.category = product['category']['title'];
          this.price = product['price'];
          this.image = product['image'];
        } else {
          console.log(response['error']);
        }
      });
  }

  addToCart(product: any) {
    //Check if product id already present in cartItem array
    //If true then navigate user to cart
    if (this.cartItems.includes(product['id'])) {
      this.toastr.success(`${product['title']} present in cart`);
      this.router.navigate(['/home/product/cart']);
    } else {
      // Add item to cart
      this.cartService
        .addCartItem(product['id'])
        .subscribe((response: any) => {
          if (response['status'] == 'success') {
            this.toastr.success(`Added ${product['title']} to cart`);
            this.loadCartItems();
          }
        });
    }
  }
  loadCartItems() {
    this.cartService.getCartItems().subscribe((response: any) => {
      if (response['status'] == 'success') {
        // Add product id to cartItem array
        this.cartItems = [];
        response['data'].forEach((item: any) => {
          this.cartItems.push(item['productId']);
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
        if (response['status'] == 'success') {
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
        if (response['status'] == 'success') {
          this.avgRating = response['data'][0]['avgRating'];
        } else {
          console.log(response['error']);
        }
      });
  }
}
