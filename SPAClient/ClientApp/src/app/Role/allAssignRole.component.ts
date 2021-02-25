import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { RoleService } from './Services/roleService';
import { AssignRolesViewModel } from './Models/roleModel';

@Component({
    templateUrl: 'allAssignedRoles.component.html'
})
export class AllAssignRoleComponent implements OnInit {

    @ViewChild(MatSort, { read: ElementRef, static: false })
    sort: MatSort;

    @ViewChild(MatPaginator, { read: ElementRef, static: false })
    paginator: MatPaginator;

    displayedColumns: string[] = ['RoleName', 'UserName'];
    dataSource: any;
    AssignModel: AssignRolesViewModel[];
    errorMessage: any;
    offset: any;

    constructor(private router: Router, private assignservice: RoleService) {}

    ngOnInit(): void {
        this.assignservice.GetAllAssignedRoles().subscribe(
            assignModel => {
                this.dataSource = new MatTableDataSource(assignModel);
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;
            },
            error => this.errorMessage = <any>error
        );
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    getNext(event: PageEvent) {
        this.offset = event.pageSize * event.pageIndex
        console.log(event.pageSize);
        console.log(event.pageIndex);
    }
}
