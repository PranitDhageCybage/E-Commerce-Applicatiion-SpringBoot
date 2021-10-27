import { AddressListComponent } from './address-list/address-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { AddressAddComponent } from './address-add/address-add.component';
import { AuthService } from '../auth/auth.service';

const routes: Routes = [
  { path: 'profile', component: ProfileComponent, canActivate: [AuthService] },
  {
    path: 'address-list',
    component: AddressListComponent,
    canActivate: [AuthService],
  },
  {
    path: 'address-add',
    component: AddressAddComponent,
    canActivate: [AuthService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
