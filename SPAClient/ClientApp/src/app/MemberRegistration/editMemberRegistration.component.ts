import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MemberRegistrationService } from './Services/memberRegistration.service';
import { SchemeDropdownModel } from '../SchemeMasters/Models/schemeDropdown.model';
import { MemberRegistrationModel } from './Models/memberRegistration.model';
import { ActivePlanModel } from '../PlanMaster/Models/activePlan.model';

@Component({
    templateUrl: 'editMemberRegistration.component.html'
})
export class EditMemberRegistrationComponent implements OnInit 
{
    AllActiveSchemeList: SchemeDropdownModel[];
    AllActivePlanModel: ActivePlanModel[];
    MemberModel: MemberRegistrationModel = new MemberRegistrationModel();

    errorMessage: any;
    output: any;
    genderList: any[];
    bsRangeValue: Date[];
    bsValue = new Date();

    public age: number;
    MemberID: any;
 
    constructor(
        private router: Router,
        private _routeParams: ActivatedRoute,
        private memberregistration: MemberRegistrationService ) {    }

    ngOnInit(): void 
    {
        this.MemberID = this._routeParams.snapshot.params['MemberId'];
        
          this.genderList = [
            { "id": 1, "name": "Male" },
            { "id": 2, "name": "Female" }
        ];

        this.memberregistration.GetAllActiveSchemeList().subscribe(
            allActiveScheme => {
                this.AllActiveSchemeList = allActiveScheme
            },
            error => this.errorMessage = <any>error
        );

        if(this.MemberID !=null)
        {
            this.memberregistration.GetMemberById(this.MemberID).subscribe(
                memberModel => 
                {
                    this.MemberModel = memberModel

                    this.memberregistration.GetAllActivePlans(this.MemberModel.SchemeID).subscribe(
                        allactivePlans => {
                            this.AllActivePlanModel = allactivePlans
                        },
                        error => this.errorMessage = <any>error
                    );
                },
                error => this.errorMessage = <any>error
            );     
        }
    }

    onSubmit() {
      let demo = this.bsValue;
        this.memberregistration.UpdateMember(this.MemberModel).subscribe(
            response => {
                this.output = response
                if (this.output.StatusCode == "409") {
                    alert('Member Already Exists');
                }
                else if (this.output.StatusCode == "200") {
                    alert('Member Details Updated Successfully');
                  this.router.navigate(['/Member/All']);
                }
                else {
                    alert('Something Went Wrong');
                }
            }); 
    }
   
    CalcuateAge(birthdate) {
        if (birthdate) {
            var timeDiff = Math.abs(Date.now() - birthdate);
            this.MemberModel.Age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
        }
    }

    numberOnly(event): boolean 
    {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }

    GetAmount(PlanID: number, SchemeID: number) {
        if (PlanID != null && SchemeID != null) {
          this.memberregistration.GetAmount(PlanID, SchemeID)
            .subscribe(amount => {
              this.MemberModel.Amount = parseInt(amount);},
             error => this.errorMessage = <any>error
           );
       }
    }
  
    OnChange(schemeId) {

        if (schemeId != null) {
            this.memberregistration.GetAllActivePlans(schemeId).subscribe(
                allactivePlans => {
                    this.AllActivePlanModel = allactivePlans
                },
                error => this.errorMessage = <any>error
            );
        }
    }
}
