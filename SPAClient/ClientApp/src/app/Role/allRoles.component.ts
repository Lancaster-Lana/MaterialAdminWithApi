import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RoleService } from './Services/roleService';
import { RoleModel } from './Models/roleModel';
import { AlertService } from '../Shared/alert.service';

const editRoleUrl: string = '/Admin/EditRole/';

@Component({
    templateUrl: 'allRoles.component..html'
})
export class AllRoleComponent implements OnInit {
    RoleList: RoleModel[];
    output: any;
    errorMessage: any;

    @ViewChild(MatSort, { read: ElementRef, static: false })
    sort: MatSort;

    @ViewChild(MatPaginator, { read: ElementRef, static: false })
    paginator: MatPaginator;

    displayedColumns: string[] = ['RoleId', 'RoleName', 'Status', 'EditAction', 'DeleteAction'];
    dataSource: any;

    constructor(private router: Router, private roleService: RoleService, private alertService: AlertService) { }

    ngOnInit(): void {
        this.roleService.GetAllRoles().subscribe(allroles => {
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
                if (response == null || response == true || response.StatusCode == "200") {
                    this.alertService.showSuccessMessage('Role deleted successfully');
                    location.reload();
                }
                else {
                    this.alertService.showErrorMessage('Role deletion error');
                    this.router.navigate(['/Admin/AllRoles']);
                }
            });
        }
    }
}
