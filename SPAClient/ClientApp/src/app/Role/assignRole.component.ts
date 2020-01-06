import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoleModel, AssignRemoveModel } from './Models/roleModel';
import { RoleService } from './Services/roleService';
import { UserDropdownModel } from '../User/Models/userModel';
import { UserService } from '../User/Services/userService';

@Component({
    templateUrl: './assignandRemoveRole.component.html',
    styleUrls: [
        //'../Content/vendor/bootstrap/css/bootstrap.min.css',
        //'../Content/vendor/metisMenu/metisMenu.min.css',
        //'../Content/dist/css/sb-admin-2.css',
        //'../Content/vendor/font-awesome/css/font-awesome.min.css'
    ]
})
export class AssignRoleComponent implements OnInit {
    UserList: UserDropdownModel[];
    AssignRemoveModel: AssignRemoveModel = new AssignRemoveModel();
    RoleList: RoleModel[];

    errorMessage: any;
    output: any;
    constructor(private userservice: UserService,
        private roleservice: RoleService,
        private router: Router) {
    }

    ngOnInit(): void {
        this.userservice.GetAllUsersDropdown().subscribe(
            allUsers => {
                this.UserList = allUsers
            },
            error => this.errorMessage = <any>error
        );

        this.roleservice.GetAllRoles().subscribe(
            allroles => {
                this.RoleList = allroles;
            },
            error => this.errorMessage = <any>error
        );
    }

    onSubmit(buttonType): void {
        if (buttonType === "onAssign") {
            console.log(this.AssignRemoveModel);
            this.roleservice.AssignRole(this.AssignRemoveModel).subscribe(
                response => {
                    this.output = response
                    if (this.output.StatusCode == "409") {
                        alert('Role Already Exists');
                    }
                    else if (this.output.StatusCode == "200") {
                        alert('Role Assigned Successfully');
                        this.router.navigate(['/Assign/AllRole']);
                    }
                    else {
                        alert('Something Went Wrong');
                    }
                });
        }
        if (buttonType === "onRemove") {
            this.roleservice.RemoveRole(this.AssignRemoveModel).subscribe(response => {

                this.output = response;
                if (this.output.StatusCode == "409") {
                    alert('Role does not Exists');
                }
                else if (this.output.StatusCode == "200") {
                    alert('Role Removed Successfully');
                    this.router.navigate(['/Assign/AllRole']);
                }
                else {
                    alert('Something Went Wrong');
                }
            });
        }
    }
}
