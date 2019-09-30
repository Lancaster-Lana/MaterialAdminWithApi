import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { RoleModel } from './Models/app.RoleModel';
import { RoleService } from './Services/app.role.Service';

@Component({
  templateUrl: './app.AllRole.html',
  styleUrls: ['../Content/vendor/bootstrap/css/bootstrap.min.css',
    '../Content/vendor/metisMenu/metisMenu.min.css',
    '../Content/dist/css/sb-admin-2.css',
    '../Content/vendor/font-awesome/css/font-awesome.min.css'
  ]
})
export class AllRoleComponent implements OnInit
{
  RoleList: RoleModel = new RoleModel();
  output: any;
  errorMessage: any;

  @ViewChild(MatSort, { read: ElementRef, static: false })
  sort: MatSort;

  @ViewChild(MatPaginator, { read: ElementRef, static: false })
  paginator: MatPaginator;

  displayedColumns: string[] = ['RoleId', 'RoleName', 'Status', 'EditAction', 'DeleteAction'];
  dataSource: any;

  constructor(private router: Router, private roleService: RoleService) {
  }

  ngOnInit(): void {
    this.roleService.GetAllRole().subscribe(
      allroles => {
        this.RoleList = allroles[0];
        this.dataSource = new MatTableDataSource(allroles);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error => this.errorMessage = <any>error
    );
  }

  Delete(RoleId) {

    if (confirm("Are you sure to delete Role ?")) {
      this.roleService.DeleteRole(RoleId).subscribe
        (
          response => {
            if (response.StatusCode == "200") {
              alert('Deleted Role Successfully');
              location.reload();
            }
            else {
              alert('Something Went Wrong');
              this.router.navigate(['/Role/All']);
            }
          }
        )
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
