import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { SignupComponent } from './components/signup/signup.component';
import { UploadImageComponent } from './components/upload-image/upload-image.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { AdminService } from './services/admin.service';
import { BrandListComponent } from './components/brand-list/brand-list.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { CategoryAddComponent } from './components/category-add/category-add.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AdminService],
  },
  {
    path: 'user-list',
    component: UserListComponent,
    canActivate: [AdminService],
  },
  {
    path: 'product-list',
    component: ProductListComponent,
    canActivate: [AdminService],
  },
  {
    path: 'order-list',
    component: OrderListComponent,
    canActivate: [AdminService],
  },
  {
    path: 'order-details',
    component: OrderDetailsComponent,
    canActivate: [AdminService],
  },

  {
    path: 'product-add',
    component: ProductAddComponent,
    canActivate: [AdminService],
  },
  {
    path: 'product-upload-image',
    component: UploadImageComponent,
    canActivate: [AdminService],
  },

  {
    path: 'brand-list',
    component: BrandListComponent,
    canActivate: [AdminService],
  },
  {
    path: 'brand-add',
    component: BrandAddComponent,
    canActivate: [AdminService],
  },
  {
    path: 'category-list',
    component: CategoryListComponent,
    canActivate: [AdminService],
  },
  {
    path: 'category-add',
    component: CategoryAddComponent,
    canActivate: [AdminService],
  },

  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
