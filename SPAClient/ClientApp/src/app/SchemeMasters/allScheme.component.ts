import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SchemeService } from './Services/scheme.service';
import { SchemeMasterViewModel } from './Models/schemeView.model';

@Component({
  templateUrl: './allScheme.component.html'
})
export class AllSchemeComponent implements OnInit
{
  AllSchemeList: SchemeMasterViewModel[];
  displayedColumns: string[] = ['SchemeID', 'SchemeName', 'Status', 'Createddate', 'EditAction', 'DeleteAction'];
  dataSource: any;
  errorMessage: any;
  @ViewChild(MatSort, { read: ElementRef, static: false })
  sort: MatSort;
  @ViewChild(MatPaginator, { read: ElementRef, static: false })
  paginator: MatPaginator;

  
  constructor(private location: Location, private router: Router, private SchemeService: SchemeService) {
  }

  ngOnInit() {
    this.SchemeService.GetAllScheme().subscribe(
      AllScheme => {
        this.AllSchemeList = AllScheme
        this.dataSource = new MatTableDataSource(this.AllSchemeList);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error => this.errorMessage = <any>error
    );
  }
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  Delete(schemeId): void {
    if (confirm("Are you sure to delete Scheme ?")) {
        this.SchemeService.DeleteScheme(schemeId).subscribe(response => {
            if (response.StatusCode == "200") {
                alert('Deleted Scheme Successfully');
                location.reload();
            }
            else {
                alert('Something Went Wrong');
                this.router.navigate(['/Scheme/All']);
            }
        });
    }
  }
}
