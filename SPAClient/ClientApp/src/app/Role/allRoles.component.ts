import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { RoleService } from './Services/roleService';
import { RoleModel } from './Models/roleModel';

const editRoleUrl: string = '/Admin/EditRole/';

@Component({
    templateUrl: './allRoles.component..html',
    styleUrls: [
        //'../Content/vendor/bootstrap/css/bootstrap.min.css',
        //'../Content/vendor/metisMenu/metisMenu.min.css',
        //'../Content/dist/css/sb-admin-2.css',
        //'../Content/vendor/font-awesome/css/font-awesome.min.css'
    ]
})
export class AllRoleComponent implements OnInit
{
    RoleList: RoleModel[];// = new RoleModel();
    output: any;
    errorMessage: any;

    @ViewChild(MatSort, { read: ElementRef, static: false })
    sort: MatSort;

    @ViewChild(MatPaginator, { read: ElementRef, static: false })
    paginator: MatPaginator;

    displayedColumns: string[] = ['RoleId', 'RoleName', 'Status', 'EditAction', 'DeleteAction'];
    dataSource: any;

    constructor(private router: Router, private roleService: RoleService) { }

    ngOnInit(): void {
        this.roleService.GetAllRoles().subscribe(
            allroles => {
                this.RoleList = allroles;
                this.dataSource = new MatTableDataSource(allroles);
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;
            },
            error => this.errorMessage = <any>error
        );
    }

    EditRole(id) {
        this.router.navigate([editRoleUrl, id]);
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    Delete(roleId) {

        if (confirm("Are you sure to delete the role ?")) {
            this.roleService.DeleteRole(roleId).subscribe(response => {
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
}
