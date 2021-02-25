import { Component, OnInit, ViewChild, Input, EventEmitter, Output, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MemberRegistrationService } from './Services/memberRegistration.Service';
import { MemberRegistrationGridModel } from './Models/memberRegistrationGrid.model';
import { PaginationService } from '../Shared/PaginationService';

@Component({
    templateUrl: './allMemberRegistration.component.html'
})
export class AllMemberRegistration implements OnInit
{
  data: MemberRegistrationGridModel[];
  errorMessage: any;

  @ViewChild(MatSort, { read: ElementRef, static: false })
  sort: MatSort;

  @ViewChild(MatPaginator, { read: ElementRef, static: false })
  paginator: MatPaginator;

    displayedColumns: string[] = ['MemberId', 'MemberNo', 'MemberName', 'Contactno','PlanName', 'SchemeName', 'JoiningDate', 'EditAction', 'DeleteAction'];
    dataSource = new MatTableDataSource<MemberRegistrationGridModel>();;
    @Input() totalCount: number;
    @Output() onPageSwitch = new EventEmitter();

    constructor(private _Route: Router,private memberregistration: MemberRegistrationService, public paginationService: PaginationService) { }

    ngOnInit() {
        this.memberregistration.GetAllMember().subscribe(
            allMember => {
                this.data = allMember
                this.dataSource = new MatTableDataSource(this.data);
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;
            },
            error => this.errorMessage = <any>error
        );
    }

    Delete(MemberId): void 
    {
        console.log(MemberId);
        if (confirm("Are you sure to delete Member ?")) 
        {
          this.memberregistration.DeleteMember(MemberId).subscribe
            (
            response => {
              if (response.StatusCode == "200") 
              {
                alert('Deleted Member Successfully');
                location.reload();
              }
              else {
                alert('Something Went Wrong');
                this._Route.navigate(['/Member/All']);
              }
            }
            )
        }
      }
      applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
      }
}
