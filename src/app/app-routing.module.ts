import { AuthGuard } from './session/session-guard';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { EditUserComponent } from './editUser/edit-user/edit-user.component';
import { ManageRoleComponent } from './manageRole/manage-role/manage-role.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login'},
  { path: 'login', component: LoginComponent },
  { path: 'header' , component: HeaderComponent, canActivate: [ AuthGuard ]},
  { path: 'register' , component: SignupComponent},
  { path: 'manageUser', component: ManageUserComponent},
  { path: 'editUser/:id', component: EditUserComponent},
  { path: 'roles/:id', component: ManageRoleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
