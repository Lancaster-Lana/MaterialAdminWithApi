import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { RequestMemberModel } from '../Models/app.RequestMemberModel';
import { ResponseMemberModel } from '../Models/app.ResponseMemberModel';
import { RequestMemberNoModel } from '../Models/app.RequestMemberNoModel';
import { RenewalModel } from '../Models/app.RenewalModel';
import{environment} from '../../../environments/environment';
import { SchemeDropdownModel } from 'src/app/SchemeMasters/Models/schemeDropdown.model';
import { ActivePlanModel } from 'src/app/PlanMaster/Models/activePlan.model';


@Injectable({
    providedIn: 'root'
})
export class RenewalService {

    private data: any;

    token: any;
    username: any;

    constructor(private http: HttpClient) {
        this.data = JSON.parse(localStorage.getItem('currentUser'));
        this.token = this.data.token;
        this.username = this.data.username;
    }

    public GetMemberNo(requestModel: RequestMemberModel) {
        var apiUrl = environment.apiEndpoint + "/api/GetMemberNo/";
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post<ResponseMemberModel>(apiUrl, requestModel, { headers: headers })
            .pipe(tap(data => data),
                catchError(this.handleError)
            );
    }

    public GetRenewalDetailsbyMemberNo(requestMemberNoModel: RequestMemberNoModel) {
        var apiUrl = environment.apiEndpoint + "/api/RenewalDetails/";
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post<RenewalModel>(apiUrl, requestMemberNoModel, { headers: headers })
            .pipe(tap(data => data),
                catchError(this.handleError)
            );
    }

    public SaveRenew(renewalModel: RenewalModel) {

        var apiUrl = environment.apiEndpoint + "/api/Renewal/";
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post<any>(apiUrl, renewalModel, { headers: headers, observe: 'response' })
            .pipe(tap(data => data),
                catchError(this.handleError)
            );
    }

    public GetAllActiveSchemeList() {
        var apiUrl = environment.apiEndpoint+"/api/SchemeDropdown/";
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<SchemeDropdownModel[]>(apiUrl, { headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }

      public GetAllActivePlans(schemeId) {
        var apiUrl = environment.apiEndpoint+"/api/AllActivePlanMaster" + '/' + schemeId;;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<ActivePlanModel[]>(apiUrl, { headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError('Something bad happened; please try again later.');
    };
}
