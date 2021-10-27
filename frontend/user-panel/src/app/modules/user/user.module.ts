import { UserService } from './../../../../../admin-panel/src/app/services/user.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { AddressAddComponent } from './address-add/address-add.component';
import { AddressListComponent } from './address-list/address-list.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AddressAddComponent, AddressListComponent, ProfileComponent],
  imports: [CommonModule, UserRoutingModule, FormsModule],
  providers: [UserService],
})
export class UserModule {}
