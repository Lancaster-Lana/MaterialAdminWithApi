import { Injectable, inject, Inject } from '@angular/core';
import { Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { RoleModel, AssignRemoveModel, AssignRolesViewModel } from '../Models/roleModel';
import { environment } from '../../../environments/environment';
import { AlertService } from '../../Shared/alert.service';

const apiUrl = environment.apiEndpoint + "/api/Role/";

@Injectable({
    providedIn: 'root'
})
export class RoleService {

    data: any;
    token: any;
    username: any;

    constructor(private http: HttpClient, @Inject(AlertService) private alertService)
    {
        this.data = JSON.parse(localStorage.getItem('AdminUser'));
        this.token = this.data.token;
    }

    public GetAllRoles() {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<RoleModel[]>(apiUrl, { headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }

    public GetRoleById(roleId) {
        var editUrl = apiUrl + roleId;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
      return this.http.get<RoleModel>(editUrl, { headers: headers })
        .pipe(tap(data => data), catchError(this.handleError) );
    }

    public AddRole(rolemodel: RoleModel) {

        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post(apiUrl, rolemodel, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }

    public UpdateRole(id: any, rolemodel: RoleModel)
    {
        var putUrl = apiUrl + id;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.put<any>(putUrl, rolemodel, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }

    public DeleteRole(roleId)
    {
        var deleteUrl = apiUrl + roleId;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.delete<any>(deleteUrl, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }

    public GetAllAssignedRoles() {
        let apiUrl = environment.apiEndpoint + "/api/AssignRoles/";
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<AssignRolesViewModel[]>(apiUrl, { headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }

    public AssignRole(assignmodel: AssignRemoveModel) {
        let apiUrl = environment.apiEndpoint + "/api/AssignRoles/";
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post<any>(apiUrl, assignmodel, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }

    public RemoveRole(assignmodel: AssignRemoveModel) {
        let apiUrl = environment.apiEndpoint + "/api/RemoveRole/";
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post<any>(apiUrl, assignmodel, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }

    private handleError(error: HttpErrorResponse)
    {
        if (error.error instanceof ErrorEvent) {
            this.alertService.showErrorMessage(error.error.message);
            console.error('An error occurred:', error.error.message);
        } else {
            let errorMsg = `Backend returned code ${error.status}, ` + `body was: ${error.error}`;
            this.alertService.showErrorMessage(errorMsg);
            console.error(errorMsg);
        }
   
        return throwError('Something bad happened; please try again later.');
    };
}
