import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PasswordListComponent } from './password-list/password-list.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { TopNavBarComponent } from './top-nav-bar/top-nav-bar.component';
import { SiteFooterComponent } from './site-footer/site-footer.component';
import { SiteLayoutComponent } from './site-layout/site-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PasswordListComponent,
    SideBarComponent,
    TopNavBarComponent,
    SiteFooterComponent,
    SiteLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
