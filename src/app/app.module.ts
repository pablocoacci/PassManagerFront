import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PasswordListComponent } from './password-list/password-list.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { TopNavBarComponent } from './top-nav-bar/top-nav-bar.component';
import { SiteFooterComponent } from './site-footer/site-footer.component';
import { SiteLayoutComponent } from './site-layout/site-layout.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { CreatePasswordComponent } from './create-password/create-password.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ConfigService } from './shared/config.service';
import { InterceptorService } from './shared/interceptor.service';
import { LoadingComponent } from './shared/loading/loading.component';

export function init(config: ConfigService) {
  return () => config.load();
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PasswordListComponent,
    SideBarComponent,
    TopNavBarComponent,
    SiteFooterComponent,
    SiteLayoutComponent,
    RegisterComponent,
    ProfileComponent,
    CreatePasswordComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DataTablesModule
  ],
  providers: [
    HttpClient,
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: init,
      deps: [ConfigService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
