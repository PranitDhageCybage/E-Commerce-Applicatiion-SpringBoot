import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { CartComponent } from './cart/cart.component';
import { GalleryComponent } from './gallery/gallery.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from './product.service';
import { CartService } from './cart.service';
import { CategoryService } from './category.service';
import { GalleryService } from './gallery.service';
import { ReviewProductComponent } from './review-product/review-product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CartComponent,
    GalleryComponent,
    ReviewProductComponent,
    ProductDetailsComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
  ],
  providers: [ProductService, CartService, CategoryService, GalleryService],
})
export class ProductModule {}
