import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../Shared/alert.service';
import { RoleService } from './Services/roleService';
import { RoleModel } from './Models/roleModel';

@Component({
  templateUrl: './editRole.component.html'
})
export class EditRoleComponent implements OnInit
{
  roleId: number;
  RoleModel: RoleModel = new RoleModel();
  errorMessage: any;
  output: any;

  constructor(
      private router: Router,
      private routeParams: ActivatedRoute,
      private roleService: RoleService,
      private alertService: AlertService) {
  }

  ngOnInit() {
    this.roleId = this.routeParams.snapshot.params['RoleID'];

    this.roleService.GetRoleById(this.roleId).subscribe(roleModel => {
          this.RoleModel = roleModel;
      },
      error => this.errorMessage = <any>error);
  }

  onSubmit() {
      this.roleService.UpdateRole(this.roleId, this.RoleModel).subscribe(response => {
          if (response == true)//(this.output == null || this.output.StatusCode == "200")
          {
             this.alertService.showSuccessMessage('Role Saved Successfully');
              this.router.navigate(['/Admin/AllRoles']);
          }
          //else if (this.output.StatusCode == "409") {this.alertService.showWarningMessage('Role Already Exists');}
          else {
              this.alertService.showErrorMessage(response);// 'Something Went Wrong');
          }
      });
   }
}
