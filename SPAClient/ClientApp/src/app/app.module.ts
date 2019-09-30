import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatSortModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatSnackBar, MatSnackBarConfig, MatSnackBarModule, MatDialog, MatDialogModule } from '@angular/material';
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router';
import { RoutingConfig } from './app-routing.module';
import { BsDatepickerModule, } from 'ngx-bootstrap/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { MemberListComponent } from './MemberRegistration/List/app.MemberListComponent ';
import { MemberViewComponent } from './MemberRegistration/List/app.MemberViewComponent';
import { PaymentOverviewComponent } from './Payment/List/app.PaymentOverviewComponent';
import { PaymentListComponent } from './Payment/List/app.PaymentListComponent';
import { RenewalComponent } from './Renewal/app.Renewal.Component';

import { AppComponent } from './app.component';
import { LoginComponent } from './Login/app.LoginComponent';

import { AppAdminLayoutComponent } from './_layout/app-adminlayout.component';
import { AdminLogoutComponent } from './Login/app.AdminLogout.Component';
import { AdminDashboardComponent } from './AdminDashboard/app.AdminDashboardComponent';
import { AdminAuthGuardService } from './AuthGuard/AdminAuthGuardService';

import { AppUserLayoutComponent } from './_layout/app-userlayout.component';
import { UserDashboardComponent } from './UserDashboard/app.UserDashboardComponent';
import { UserLogoutComponent } from './Login/app.UserLogout.Component';
import { UserAuthGuardService } from './AuthGuard/UserAuthGuardService';
import { AllUserRegistrationComponent } from './CreateUsers/app.AllUserRegistration.component';
import { EditUserRegistrationComponent } from './CreateUsers/app.EditUserRegistration.component';
import { UserRegistrationComponent } from './CreateUsers/app.UserRegistration.component';

import { MemberRegistrationComponent } from './MemberRegistration/app.MemberRegistration.component';
import { EditMemberRegistrationComponent } from './MemberRegistration/app.EditMemberRegistration.component';

import { AllAssignRoleComponent } from './AssignRole/app.AllAssignRole.component';
import { AssignRoleComponent } from './AssignRole/app.AssignRole.component';
 
import { AllRoleComponent } from './RoleMaster/app.AllRole.component';
import { CreateRoleComponent } from './RoleMaster/createRole.component';
import { EditRoleComponent } from './RoleMaster/app.EditRole.component';

import { MemberDetailsReportComponent } from './Reports/app.MemberDetailsReport.Component';
import { YearwiseReportComponent } from './Reports/app.YearwiseReport.Component';
import { MonthwiseReportComponent } from './Reports/app.MonthwiseReport.Component';
import { RenewalReportComponent } from './Reports/app.RenewalReport.Component';
import { GenerateRecepitComponent } from './Recepit/app.generateRecepit.Component';

import { SchemeComponent } from './SchemeMasters/app.Scheme.Component';
import { AllSchemeComponent } from './SchemeMasters/app.AllScheme.Component';
import { EditSchemeComponent } from './SchemeMasters/app.EditScheme.Component';
import { PlanMasterComponent } from './PlanMaster/app.planmaster.component';
import { AllPlanMasterComponent } from './PlanMaster/app.allplanmaster.component';
import { EditPlanComponent } from './PlanMaster/app.EditPlan.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';

@NgModule({
  declarations: [
    AppComponent, LoginComponent, NavMenuComponent,
    AppAdminLayoutComponent, AdminDashboardComponent, AdminLogoutComponent,
    AppUserLayoutComponent, UserRegistrationComponent, UserLogoutComponent, UserDashboardComponent, AllUserRegistrationComponent, EditUserRegistrationComponent,
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
