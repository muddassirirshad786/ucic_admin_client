import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { UserListComponent } from './user-list/user-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserCreateComponent } from './user-create/user-create.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: UserListComponent },
      { path: 'create', component: UserCreateComponent },
      { path: 'edit/:id', component: UserEditComponent }
    ]),
    UserListComponent,
    UserEditComponent,
    UserCreateComponent
  ]
})
export class UsersModule { }
