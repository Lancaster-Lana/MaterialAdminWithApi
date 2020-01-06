import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AlertService } from '../Shared/alert.service';

import { UserModel } from './Models/userModel';
import { UserService } from './Services/userService';

@Component({
    templateUrl: './editUser.component.html'
})
export class EditUserComponent implements OnInit {
    Id: any;
    UserModel: UserModel = new UserModel();
    output: any;
    errorMessage: any;

    constructor(
        private router: Router, private routerParams: ActivatedRoute,
        private datePipe: DatePipe, private userService: UserService,
        private alertService: AlertService) { }

    ngOnInit() {
        this.Id = this.routerParams.snapshot.params['UserId'];

        this.userService.GetUserId(this.Id).subscribe(userModel => {
            this.UserModel = userModel;
        },
        error => this.errorMessage = <any>error);
    }

    onSubmit() {

        this.userService.UpdateUser(this.Id, this.UserModel).subscribe(response => {
            this.output = response;
            if (this.output == null || this.output.StatusCode == "200") {
                this.alertService.showStickyMessage('User updated successfully !');
                this.router.navigate(['/Admin/AllUsers']);
            }
            else if (this.output.StatusCode == "409") {
                this.alertService.showWarningMessage('User Already Exists');
            }

            else {
                this.alertService.showStickyMessage('Something Went Wrong');
            }
        });
    }
}
