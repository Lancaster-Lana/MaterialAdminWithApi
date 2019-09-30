import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RoleModel } from './Models/app.RoleModel';
import { RoleService } from './Services/app.role.Service';
import { AlertService } from '../Shared/alert.service';

@Component({
  templateUrl: './app.EditRole.html',
  styleUrls: ['../Content/vendor/bootstrap/css/bootstrap.min.css',
    '../Content/vendor/metisMenu/metisMenu.min.css',
    '../Content/dist/css/sb-admin-2.css',
    '../Content/vendor/font-awesome/css/font-awesome.min.css'
  ]
})
export class EditRoleComponent implements OnInit {
  roleId: number;
  RoleModel: RoleModel = new RoleModel();
  errorMessage: any;
  output: any;

  constructor(
    private router: Router, private _routeParams: ActivatedRoute,
    private roleService: RoleService,
    private alertService: AlertService) {
  }

  ngOnInit() {
    this.roleId = this._routeParams.snapshot.params['RoleID'];

    this.roleService.GetRoleById(this.roleId).subscribe(
      allPeriod => {
        this.RoleModel = allPeriod
      },
      error => this.errorMessage = <any>error);
  }

  onSubmit() {
    this.roleService.UpdateRole(this.RoleModel).subscribe(
      response => {
        this.output = response
        if (this.output.StatusCode == "409") {
          this.alertService.showWarningMessage('Role Already Exists');
        }
        else if (this.output.StatusCode == "200") {
          this.alertService.showSuccessMessage('Role Saved Successfully');
          this.router.navigate(['/Role/All']);
        }
        else {
          this.alertService.showErrorMessage('Something Went Wrong');
        }
      });
   }
}
