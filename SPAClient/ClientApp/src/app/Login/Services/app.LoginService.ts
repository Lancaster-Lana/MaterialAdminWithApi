import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { LoginModel } from '../Models/app.LoginModel';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    public token: string;
    constructor(private _http: HttpClient, private _Route: Router) {

    }
    private apiUrl = environment.apiEndpoint + "/api/Authenticate/";

    public validateLoginUser(loginmodel: LoginModel) {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._http.post<any>(this.apiUrl, loginmodel, { headers: headers })
            .pipe(tap(data => {
                console.log(data);

                if (data.token != null) {
                    if (data.usertype == "2") {
                        // store username and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentUser', JSON.stringify({ username: loginmodel.Username, token: data.Token }));
                    }
                    else if (data.usertype == "1") {
                        // store username and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('AdminUser', JSON.stringify({ username: loginmodel.Username, token: data.Token }));
                    }
                    // return true to indicate successful login
                    return data;
                } else {
                    return null;
                }
            }),
                catchError(this.handleError)
          );
    }

    LogoutUser() {
        localStorage.removeItem('currentUser');
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
