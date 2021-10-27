import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthService } from './modules/auth/auth.service';

const routes: Routes = [
  //Default route
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  {
    path: 'home',
    component: HomeComponent,
    // canActivate: [AuthService],
    children: [
      {
        path: 'user',
        loadChildren: () =>
          import('./modules/user/user.module').then((m) => m.UserModule)
      },
      {
        path: 'order',
        loadChildren: () =>
          import('./modules/order/order.module').then((m) => m.OrderModule),
      },
      {
        path: 'product',
        loadChildren: () =>
          import('./modules/product/product.module').then(
            (m) => m.ProductModule
          ),
      },
    ],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
