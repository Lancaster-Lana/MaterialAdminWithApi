import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from './Models/app.LoginModel';
import { LoginService } from './Services/app.LoginService';
import { MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition, MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  templateUrl: './login.html'
})
export class LoginComponent implements OnInit
{
  output: any;
  LoginModel: LoginModel = new LoginModel();
  actionButtonLabel: string = 'Retry';
  action: boolean = false;
  setAutoHide: boolean = true;
  autoHide: number = 2000;
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';

  constructor(private router: Router, public snackBar: MatSnackBar, private loginService: LoginService) { }

  ngOnInit()
  {
    localStorage.clear();
  }

  onSubmit() {
    this.loginService.validateLoginUser(this.LoginModel)
      .subscribe(response => {
        if (response.token == null && response.usertype == "0") {
          let config = new MatSnackBarConfig();
          config.duration = this.setAutoHide ? this.autoHide : 0;
          config.verticalPosition = this.verticalPosition;

          this.snackBar.open("Invalid Username and Password", this.action ? this.actionButtonLabel : undefined, config);

          this.router.navigate(['Login']);
        }

        if (response.usertype == "1") {
          let config = new MatSnackBarConfig();
          config.duration = this.setAutoHide ? this.autoHide : 0;
          config.verticalPosition = this.verticalPosition;

          this.snackBar.open("Logged in successfully as admin", this.action ? this.actionButtonLabel : undefined, config);

          this.router.navigate(['/Admin/Dashboard']);
        }

        if (response.usertype == "2") {
          let config = new MatSnackBarConfig();
          config.duration = this.setAutoHide ? this.autoHide : 0;
          config.verticalPosition = this.verticalPosition;

          //Toars message
          this.snackBar.open("Logged in Successfully", this.action ? this.actionButtonLabel : undefined, config);

          this.router.navigate(['/User/Dashboard']);
        }
      });
  }
}
