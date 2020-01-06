import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { PeriodService } from '../PeriodMaster/Services/period.service';
import { SchemeService } from '../SchemeMasters/Services/scheme.service';
import { PlanService } from '../PlanMaster/Services/planmaster.service';
import { PeriodModel } from '../PeriodMaster/Models/periodModel';
import { SchemeDropdownModel } from '../SchemeMasters/Models/schemeDropdown.model';
import { PlanMasterModel } from './Models/planMaster.model';

@Component({
    templateUrl: './editPlan.component.html'
})
export class EditPlanComponent implements OnInit {
    private _periodService;
    private _schemeService;
    private _planService;
    PeriodList: PeriodModel[];
    AllActiveSchemeList: SchemeDropdownModel[];
    errorMessage: any;
    planModel: PlanMasterModel = new PlanMasterModel();
    PlanID: any;
    output: any;


    constructor(private _Route: Router, private _routeParams: ActivatedRoute, private periodService: PeriodService, private schemeService: SchemeService, private planService: PlanService) {
        this._periodService = periodService;
        this._schemeService = schemeService;
        this._planService = planService;
    }

    ngOnInit(): void {

        this.PlanID = this._routeParams.snapshot.params['PlanID'];
       
        // GetAllPeriod
        this._periodService.GetAllPeriod().subscribe(
            allPeriod => {
                this.PeriodList = allPeriod
            
            },
            error => this.errorMessage = <any>error
        );

        // GetAllScheme

        this._schemeService.GetAllActiveSchemeList().subscribe(
            allActiveScheme => {
                this.AllActiveSchemeList = allActiveScheme
            },
            error => this.errorMessage = <any>error
        );

        // GetPlanByPlanID

        this._planService.GetPlanByPlanID(this.PlanID).subscribe(
            plan => {
                this.planModel = plan
    
            },
            error => this.errorMessage = <any>error
        );
    }

    numberOnly(event): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }

    onSubmit() 
    {
        this._planService.UpdatePlan(this.planModel).subscribe(
            response => {
                this.output = response
                if (this.output.StatusCode == "409") {
                    alert('Plan Already Exists');
                }
                else if (this.output.StatusCode == "200") {
                    alert('Plan Saved Successfully');
                    this._Route.navigate(['/Plan/All']);
                }
                else {
                    alert('Something Went Wrong');
                }
            });
    }
}
