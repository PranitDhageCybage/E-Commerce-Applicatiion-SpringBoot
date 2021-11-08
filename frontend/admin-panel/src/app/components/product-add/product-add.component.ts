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
  quantity: number = 1;

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
      this.productService.getProduct(id).subscribe((response: any) => {
        if (response['success']) {
          this.product = response['data'];
          this.id = this.product['prod_id'];
          this.title = this.product['prod_title'];
          this.description = this.product['prod_description'];
          this.price = this.product['prod_price'];
          this.category = this.product['category']['cat_id'];
          this.brand = this.product['company']['comp_id'];
          this.image = this.product['photo'];
          this.quantity = this.product['prod_qty'];
        }
      });
    }
    this.loadBrands();
    this.loadCategories();
  }
  loadBrands() {
    this.brandService.getBrands().subscribe((response: any) => {
      if (response['success']) {
        this.brands = response['data'];
      } else {
        console.log(response['error']);
      }
    });
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe((response: any) => {
      if (response['success']) {
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
          this.id,
          this.title,
          this.description,
          this.price,
          this.category,
          this.brand,
          this.quantity
        )
        .subscribe((response: any) => {
          if (response['success']) {
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
          this.brand,
          this.quantity
        )
        .subscribe((response: any) => {
          if (response['success']) {
            this.router.navigate(['/product-list']);
          } else {
          }
        });
    }
  }
  onUploadImage() {
    this.router.navigate(['/product-upload-image'], {
      queryParams: { id: this.product['prod_id'] },
    });
  }
}
