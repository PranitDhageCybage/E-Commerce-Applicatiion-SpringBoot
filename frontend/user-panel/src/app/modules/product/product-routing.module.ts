import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CartComponent } from './cart/cart.component';
import { GalleryService } from './gallery.service';
import { GalleryComponent } from './gallery/gallery.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ReviewProductComponent } from './review-product/review-product.component';

const routes: Routes = [
  {
    path: 'gallery',
    component: GalleryComponent,
    canActivate: [GalleryService],
  },
  { path: 'cart', component: CartComponent, canActivate: [AuthService] },
  {
    path: 'review',
    component: ReviewProductComponent,
    canActivate: [AuthService],
  },
  {
    path: 'details/:id',
    component: ProductDetailsComponent,
    canActivate: [AuthService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
