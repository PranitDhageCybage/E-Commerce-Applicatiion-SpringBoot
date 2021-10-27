import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from 'src/app/services/brand.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
})
export class ProductAddComponent implements OnInit {
  product: any = null;
  categories: string[] = [];
  brands: string[] = [];

  id: number = 0;
  title: string = '';
  description: string = '';
  price: number = 0;
  category: number = 1;
  brand: number = 1;
  image: string = '';

  constructor(
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    private brandService: BrandService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.queryParams['id'];
    if (id) {
      // If Id is present, Edit Product
      // else Add Product
      this.productService.getProduct(id).subscribe(
        (response: any) => {
          if (response['status'] == 'success') {
            const products = response['data'];
            // if (products.lenght > 0) {
            this.product = products[0];
            this.id = this.product['id'];
            this.title = this.product['title'];
            this.description = this.product['description'];
            this.price = this.product['price'];
            this.category = this.product['category']['id'];
            this.brand = this.product['brand']['id'];
            this.image = this.product['image'];
          }
        }
        // }
      );
    }
    this.loadBrands();
    this.loadCategories();
  }
  loadBrands() {
    this.brandService.getBrands().subscribe((response: any) => {
      if (response['status'] == 'success') {
        this.brands = response['data'];
      } else {
        console.log(response['error']);
      }
    });
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe((response: any) => {
      if (response['status'] == 'success') {
        this.categories = response['data'];
      } else {
        console.log(response['error']);
      }
    });
  }

  onUpdate() {
    if (this.product) {
      //Edit
      this.productService
        .updateProduct(
          this.product['id'],
          this.title,
          this.description,
          this.price,
          this.category,
          this.brand
        )
        .subscribe((response: any) => {
          if (response['status'] == 'success') {
            this.router.navigate(['/product-list']);
          } else {
          }
        });
    } else {
      //Insert
      this.productService
        .insertProduct(
          this.title,
          this.description,
          this.price,
          this.category,
          this.brand
        )
        .subscribe((response: any) => {
          if (response['status'] == 'success') {
            this.router.navigate(['/product-list']);
          } else {
          }
        });
    }
  }
  onUploadImage() {
    this.router.navigate(['/product-upload-image'], {
      queryParams: { id: this.product['id'] },
    });
  }
}
