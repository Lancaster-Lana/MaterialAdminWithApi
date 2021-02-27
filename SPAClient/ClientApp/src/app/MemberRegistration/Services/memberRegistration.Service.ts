import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators'
import { throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { PaginationService } from '../../Shared/PaginationService';
import { MemberRegistrationModel } from '../Models/memberRegistration.model';
import { MemberRegistrationGridModel } from '../Models/memberRegistrationGrid.model';
import { SchemeDropdownModel } from '../../SchemeMasters/Models/schemeDropdown.model';
import { ActivePlanModel } from '../../PlanMaster/Models/activePlan.model';

@Injectable({
    providedIn: 'root'
})
export class MemberRegistrationService {
    private data: any;
    private apiUrl = environment.apiEndpoint + "/api/RegisterMember/";

    token: any;
    username: any;

    constructor(private http: HttpClient, private paginationService: PaginationService) {
        this.data = JSON.parse(localStorage.getItem('currentUser'));
        this.token = this.data.token;
        this.username = this.data.username;
    }

    getAll<T>() {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        let Url = environment.apiEndpoint + "/api/RegisterMember";
        const mergedUrl = `${Url}` + `?page=${this.paginationService.page}&pageCount=${this.paginationService.pageCount}`;

        return this.http.get<T>(mergedUrl, { headers: headers, observe: 'response' }).pipe(
            catchError(this.handleError)
        );
    }

    public SaveMember(memberModel: MemberRegistrationModel)
    {
        let SaveUrl = environment.apiEndpoint +"/api/RegisterMember";
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post(SaveUrl, memberModel, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }

    public UpdateMember(memberModel: MemberRegistrationModel) {
        let updateUrl = environment.apiEndpoint +"/api/RegisterMember/" + memberModel.MemberId;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.put(updateUrl, memberModel, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }

    public GetAllMember()
    {
        let getUrl = environment.apiEndpoint +"/api/RegisterMember";
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<MemberRegistrationGridModel[]>(this.apiUrl, { headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }

    public GetMemberById(MemberId) {
        console.log(MemberId);
        let editUrl = environment.apiEndpoint +"/api/RegisterMember"+ '/' + MemberId;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<MemberRegistrationModel>(editUrl, { headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }

    public DeleteMember(MemberId) {
        let deleteUrl = environment.apiEndpoint +"/api/RegisterMember"+ '/' + MemberId;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.delete<any>(deleteUrl, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }

    public GetAllActiveSchemeList() {
        let url = environment.apiEndpoint + "/api/SchemeDropdown/";
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<SchemeDropdownModel[]>(url, { headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }

    public GetAllActivePlans(schemeId) {
        let url = environment.apiEndpoint + "/api/AllActivePlanMaster" + '/' + schemeId;;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<ActivePlanModel[]>(url, { headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }

    public GetAmount(planID: number, schemeId: number) {
        let url = environment.apiEndpoint + "/api/GetTotalAmount/";
        let amountRequest = { "PlanId": planID, "SchemeId": schemeId };

        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post<string>(url, amountRequest, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code. The response body may contain clues as to what went wrong,
            console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
        }
        return throwError('Something bad happened; please try again later.');
    };
}
