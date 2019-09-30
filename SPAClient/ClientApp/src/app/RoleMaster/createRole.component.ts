import { Component } from '@angular/core';
import { RoleModel } from './Models/app.RoleModel';
import { RoleService } from './Services/app.role.Service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './createRole.component.html',
  styleUrls: [
    '../Content/vendor/bootstrap/css/bootstrap.min.css',
    '../Content/vendor/metisMenu/metisMenu.min.css',
    '../Content/dist/css/sb-admin-2.css',
    '../Content/vendor/font-awesome/css/font-awesome.min.css'
]
})
export class CreateRoleComponent
{
    RoleModel : RoleModel = new RoleModel();
    output: any;

    constructor(private router: Router, private roleService: RoleService) { }

    onSubmit() 
    {
        this.roleService.AddRole(this.RoleModel).subscribe(
            response => {
            this.output = response
            if (this.output.StatusCode == "409") {
                alert('Role Already Exists');
            }
            else if (this.output.StatusCode == "200") {
                alert('Role Saved Successfully');
                this.router.navigate(['/Admin/AllRoles']);
            }
            else {
                alert('Something Went Wrong');
            }
        });
    }
}
