import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoleService } from './Services/roleService';
import { RoleModel } from './Models/roleModel';

@Component({
  templateUrl: './createRole.component.html'
})
export class CreateRoleComponent
{
    RoleModel : RoleModel = new RoleModel();
    output: any;

    constructor(private router: Router, private roleService: RoleService) { }

    onSubmit() 
    {
        this.roleService.AddRole(this.RoleModel).subscribe(response => {
            this.output = response;
            if (this.output == null || this.output.StatusCode == "200") {
                alert('Role Saved Successfully');
                this.router.navigate(['/Admin/AllRoles']);
            }
            else if (this.output.StatusCode == "409") {
                    alert('Role Already Exists');}
            {
                alert('Something Went Wrong');
            }
        });
    }
}
