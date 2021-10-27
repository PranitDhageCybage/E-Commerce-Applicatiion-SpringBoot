import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { SignupComponent } from './components/signup/signup.component';
import { UploadImageComponent } from './components/upload-image/upload-image.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { AdminService } from './services/admin.service';
import { BrandService } from './services/brand.service';
import { CategoryService } from './services/category.service';
import { OrderService } from './services/order.service';
import { ProductService } from './services/product.service';
import { UserService } from './services/user.service';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { DashboardService } from './services/dashboard.service';
import { BrandListComponent } from './components/brand-list/brand-list.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { CategoryAddComponent } from './components/category-add/category-add.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    LoginComponent,
    OrderListComponent,
    ProductAddComponent,
    ProductListComponent,
    SignupComponent,
    UploadImageComponent,
    UserListComponent,
    HeaderComponent,
    FooterComponent,
    OrderDetailsComponent,
    BrandListComponent,
    CategoryListComponent,
    BrandAddComponent,
    CategoryAddComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [
    AdminService,
    UserService,
    ProductService,
    OrderService,
    BrandService,
    CategoryService,
    DashboardService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
