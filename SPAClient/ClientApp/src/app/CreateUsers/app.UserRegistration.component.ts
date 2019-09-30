import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { UserModel } from './Models/app.UserModel';
import { UserService } from './Services/app.UserRegistration.Service';
import { AlertService } from '../Shared/alert.service';

@Component({
    templateUrl: './app.UserRegistration.component.html',
  styleUrls: [
       //'../Content/vendor/bootstrap/css/bootstrap.min.css',
       // '../Content/vendor/metisMenu/metisMenu.min.css',
       // '../Content/dist/css/sb-admin-2.css',
       // '../Content/vendor/font-awesome/css/font-awesome.min.css'
    ]
})
export class UserRegistrationComponent
{
    UserModel: UserModel = new UserModel();
    output: any;

    constructor(
        private datePipe: DatePipe,
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

    onSubmit() 
    {
      this.userService.SaveUser(this.UserModel)
        .subscribe(response => {
          this.output = response
          if (this.output.StatusCode == "409") {
            this.alertService.showWarningMessage('User Already Exists');
            }
            else if (this.output.StatusCode == "200") {
              this.alertService.showSuccessMessage('User Created Successfully');
              this.router.navigate(['/User/All']);
            }
            else {
              this.alertService.showErrorMessage('Something Went Wrong');
            }
        });
    }
}
