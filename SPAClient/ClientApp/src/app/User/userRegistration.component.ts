import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AlertService } from '../Shared/alert.service';
import { UserModel } from './Models/userModel';
import { UserService } from './Services/userService';

@Component({
    templateUrl: './userRegistration.component.html'
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
      this.userService.SaveUser(this.UserModel).subscribe(response => {
          this.output = response;
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
