import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router';
import { RoutingConfig } from './app-routing.module';
import { BsDatepickerModule, } from 'ngx-bootstrap/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatSnackBar, MatSnackBarConfig, MatSnackBarModule
} from '@angular/material/snack-bar';


import { MemberListComponent } from './MemberRegistration/List/memberList.component ';
import { MemberViewComponent } from './MemberRegistration/List/memberView.component';
import { PaymentOverviewComponent } from './Payment/List/paymentOverview.component';
import { PaymentListComponent } from './Payment/List/paymentList.component';
import { RenewalComponent } from './Renewal/renewal.component';

import { AppComponent } from './app.component';
import { LoginComponent } from './Login/login.component';

import { AppAdminLayoutComponent } from './_layout/app-adminlayout.component';
import { AdminLogoutComponent } from './Login/adminLogout.сomponent';
import { AdminDashboardComponent } from './AdminDashboard/app.AdminDashboardComponent';
import { AdminAuthGuardService } from './AuthGuard/AdminAuthGuardService';

import { AppUserLayoutComponent } from './_layout/app-userlayout.component';
import { UserDashboardComponent } from './UserDashboard/userDashboard.component';
import { UserLogoutComponent } from './Login/userLogout.component';
import { UserAuthGuardService } from './AuthGuard/UserAuthGuardService';

import { AllRoleComponent } from './Role/allRoles.component';
import { CreateRoleComponent } from './Role/createRole.component';
import { EditRoleComponent } from './Role/editRole.component';
import { AssignRoleComponent } from './Role/assignRole.component';
import { AllAssignRoleComponent } from './Role/allAssignRole.component';

import { MemberRegistrationComponent } from './MemberRegistration/memberRegistration.component';
import { EditMemberRegistrationComponent } from './MemberRegistration/editMemberRegistration.component';

import { MemberDetailsReportComponent } from './Reports/app.MemberDetailsReport.Component';
import { YearwiseReportComponent } from './Reports/app.YearwiseReport.Component';
import { MonthwiseReportComponent } from './Reports/app.MonthwiseReport.Component';
import { RenewalReportComponent } from './Reports/app.RenewalReport.Component';
import { GenerateRecepitComponent } from './Recepit/app.generateRecepit.Component';

import { SchemeComponent } from './SchemeMasters/Scheme.Component';
import { AllSchemeComponent } from './SchemeMasters/allScheme.component';
import { EditSchemeComponent } from './SchemeMasters/editScheme.component';
import { PlanMasterComponent } from './PlanMaster/planmaster.component';
import { AllPlanMasterComponent } from './PlanMaster/allplanmaster.component';
import { EditPlanComponent } from './PlanMaster/editPlan.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { UserRegistrationComponent } from './User/userRegistration.component';
import { AllUserRegistrationComponent } from './User/allUserRegistration.component';
import { EditUserComponent } from './User/editUser.component';

@NgModule({
  declarations: [
    AppComponent, LoginComponent, NavMenuComponent,
    AppAdminLayoutComponent, AdminDashboardComponent, AdminLogoutComponent,
    AppUserLayoutComponent, UserRegistrationComponent, UserLogoutComponent, UserDashboardComponent, AllUserRegistrationComponent, EditUserComponent,
    AllRoleComponent, CreateRoleComponent,  EditRoleComponent, AssignRoleComponent, AllAssignRoleComponent,
    MemberRegistrationComponent, MemberListComponent, MemberViewComponent, MemberDetailsReportComponent, EditMemberRegistrationComponent,

    SchemeComponent,
    AllSchemeComponent,
    EditSchemeComponent, PlanMasterComponent,
    AllPlanMasterComponent,
    EditPlanComponent,

    PaymentOverviewComponent,
    PaymentListComponent,
    RenewalComponent,
    YearwiseReportComponent, MonthwiseReportComponent, RenewalReportComponent, GenerateRecepitComponent
  ],
  imports: [
    FormsModule, HttpClientModule,
    RouterModule, RoutingConfig,
    BsDatepickerModule.forRoot(),
    BrowserModule, //BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    MatFormFieldModule, MatTableModule, MatPaginatorModule, MatAutocompleteModule, MatInputModule, MatSortModule,
    MatDialogModule,
    MatSnackBarModule //like Toarst
  ],
  exports: [BsDatepickerModule],
  providers: [DatePipe, AdminAuthGuardService, UserAuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
