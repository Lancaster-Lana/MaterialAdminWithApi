import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { PlanService } from './Services/planmaster.service';
import { PlanMasterViewModel } from './Models/planMaster.viewmodel';

@Component({
    templateUrl: 'allplanmaster.component.html'
})
export class AllPlanMasterComponent implements OnInit
{
  PlanList: PlanMasterViewModel[];// = new PlanMasterViewModel();
  errorMessage: any;
  @ViewChild(MatSort, { read: ElementRef, static: false })
  sort: MatSort;
  @ViewChild(MatPaginator, { read: ElementRef, static: false })
  paginator: MatPaginator;

  displayedColumns: string[] = ['PlanID', 'PlanName', 'SchemeName', 'Text', 'TotalAmount', 'RecStatus', 'EditAction', 'DeleteAction'];
  dataSource: any;
    constructor(private _Route: Router, private planService: PlanService) { }

  ngOnInit(): void {
    this.planService.GetAllPlans().subscribe(
      allplan => {
        this.PlanList = allplan;
        this.dataSource = new MatTableDataSource(allplan);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error => this.errorMessage = <any>error
    );
  }


  Delete(PlanID) {
    if (confirm("Are you sure to delete Plan ?")) {
      this.planService.DeletePlan(PlanID).subscribe(response => {
            if (response.StatusCode == "200") {
              alert('Deleted Plan Successfully');
              location.reload();
            }
            else {
              alert('Something Went Wrong');
              this._Route.navigate(['/Plan/All']);
            }
          }
        )
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
