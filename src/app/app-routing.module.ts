import { ProfileComponent } from './profile/profile.component';
import { SiteLayoutComponent } from './site-layout/site-layout.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PasswordListComponent } from './password-list/password-list.component';
import { RegisterComponent } from './register/register.component';
import { CreatePasswordComponent } from './create-password/create-password.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '',
    component: SiteLayoutComponent,
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'create-password', component: CreatePasswordComponent },
      { path: 'passwordlist', component: PasswordListComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
