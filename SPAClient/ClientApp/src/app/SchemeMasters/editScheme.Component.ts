import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SchemeService } from './Services/scheme.service';
import { SchemeMasterModel } from './Models/scheme.model';
 

@Component({
    templateUrl: 'editScheme.component.html'
})
export class EditSchemeComponent implements OnInit {
    title = "Edit Scheme Master";
    SchemeForms: SchemeMasterModel = new SchemeMasterModel();
    private responsedata: any;
    private SchemeID: string;
    errorMessage: any;

    constructor(private Router: Router,private _routeParams: ActivatedRoute, private SchemeService: SchemeService) {}

    ngOnInit() 
    {
        this.SchemeID = this._routeParams.snapshot.params['schemeId'];
        if (this.SchemeID != null) 
        {
            var data = this.SchemeService.GetSchemeById(this.SchemeID).subscribe(
                Scheme => {
                    this.SchemeForms.SchemeID = Scheme.SchemeID;
                    this.SchemeForms.SchemeName = Scheme.SchemeName;
                    this.SchemeForms.Status = Scheme.Status;
                },
                error => this.errorMessage = <any>error
            );
        }
    }

    onSubmit() 
    {
        this.SchemeService.UpdateScheme(this.SchemeForms).subscribe(response => 
        {
            if(response.StatusCode == "200")
            {
                alert('Updated Scheme Successfully');
                this.Router.navigate(['/Scheme/All']);
            }
        })
    }
}
