import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../cart.service';
import { CartComponent } from '../cart/cart.component';
import { CategoryService } from '../category.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent implements OnInit {
  products: any = [];
  allProducts: any = [];
  categories: any = [];
  cartItems: number[] = [];
  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private cartService: CartService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
    this.loadCartItems();
  }

  loadProducts() {
    this.productService.getProducts().subscribe((response: any) => {
      if (response['success']) {
        this.allProducts = response['data'];
        this.products = this.allProducts;
      }
    });
  }
  filterProducts(event: any) {
    const categoryId = event.target.value;
    this.products = [];
    console.log(categoryId);

    if (categoryId == -1) {
      this.products = this.allProducts;
    } else {
      this.products = this.allProducts.filter((product: any) => {
        return product.category['cat_id'] == categoryId;
      });
    }
  }
  loadCategories() {
    this.categoryService.getCategories().subscribe((response: any) => {
      if (response['success']) {
        this.categories = response['data'];
        this.categories.unshift({ cat_id: -1, cat_title: 'All Categories' }); // Add all categories at the begining of Array
      }
    });
  }

  loadCartItems() {
    this.cartService.getCartItems().subscribe((response: any) => {
      if (response['success']) {
        // Add product id to cartItem array
        this.cartItems = [];
        response['data'].forEach((item: any) => {
          this.cartItems.push(item['product']['prod_id']);
        });
      }
    });
  }

  loadCartModel() {
    this.modalService.open(CartComponent, { size: 'lg' });
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
}
