import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { UserModel } from './Models/app.UserModel';
import { UserService } from './Services/app.UserRegistration.Service';
import { AlertService } from '../Shared/alert.service';

@Component({
  templateUrl: './app.EditUserRegistration.html',
  styleUrls: [
    //'../Content/vendor/bootstrap/css/bootstrap.min.css',
    //'../Content/vendor/metisMenu/metisMenu.min.css',
    //'../Content/dist/css/sb-admin-2.css',
    //'../Content/vendor/font-awesome/css/font-awesome.min.css'
  ]
})
export class EditUserRegistrationComponent implements OnInit
{
  Id: any;
  UserModel: UserModel = new UserModel();
  output: any;
  errorMessage: any;

  constructor(
    private router: Router, private routerParams: ActivatedRoute,
    private datePipe: DatePipe, private userService: UserService,
    private alertService: AlertService) {}

  ngOnInit()
  {
    this.Id = this.routerParams.snapshot.params['UserId'];

    this.userService.GetUserId(this.Id)
      .subscribe(userModel => {
        this.UserModel = userModel;
      },
      error => this.errorMessage = <any>error);
  }

  onSubmit() {

    this.userService.UpdateUser(this.UserModel)
      .subscribe(response => {
        this.output = response;
        if (this.output.StatusCode == "409") {
          this.alertService.showWarningMessage('User Already Exists');
        }
        else if (this.output.StatusCode == "200") {
          this.alertService.showStickyMessage('User updated successfully !');
          this.router.navigate(['/Admin/AllUsers']);
        }
        else {
          this.alertService.showStickyMessage('Something Went Wrong');
        }
      });
  }
}
