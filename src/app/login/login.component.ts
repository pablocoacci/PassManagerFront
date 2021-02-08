import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../shared/account.service';
import { LoadingService } from '../shared/loading/loading.service';
import { LoginRequest } from '../shared/models/account.model';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName: string = "";
  password: string = "";
  showErrorAlert: boolean = false;

  constructor(
    private acountService: AccountService,
    private router: Router,
    private loadingService: LoadingService) { }

  ngOnInit(): void {
    
  }

  signIn(){
    this.loadingService.show();

    let rq: LoginRequest = {
      password: this.password,
      userName: this.userName
    };

    this.acountService.login(rq).subscribe(
      res => {
        this.loadingService.hide(); 
        this.router.navigate(['passwordlist']); 
      },
      err => { 
        this.loadingService.hide();
        this.showErrorAlert = true; 
      }
    );
  }

  hideErrorAlert() {
    this.showErrorAlert = false;
  }
}
