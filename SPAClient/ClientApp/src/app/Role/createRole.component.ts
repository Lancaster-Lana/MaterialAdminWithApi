import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoleService } from './Services/roleService';
import { RoleModel } from './Models/roleModel';
import { AlertService } from '../Shared/alert.service';

@Component({
  templateUrl: './createRole.component.html'
})
export class CreateRoleComponent
{
    RoleModel: RoleModel = new RoleModel();
    errorMessage: any;

    constructor(private router: Router, private roleService: RoleService, private alertService: AlertService) { }

    onSubmit() 
    {
        this.roleService.AddRole(this.RoleModel).subscribe((response : any )=> {
            if (response == true || response.StatusCode == "200") {
                this.alertService.showSuccessMessage('Role created successfully !');
                this.router.navigate(['/Admin/AllRoles']);
            }
            else if (response.StatusCode == "409")
            {
                this.alertService.showErrorMessage('Role Already Exists');
                return;
            }
            else
            {
                this.alertService.showErrorMessage('Something Went Wrong');
            }
        },
        error => this.errorMessage = <any>error);
    }
}
