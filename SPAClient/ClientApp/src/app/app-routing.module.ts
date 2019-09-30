import { Routes, RouterModule } from '@angular/router';

import { AppAdminLayoutComponent } from './_layout/app-adminlayout.component';
import { AdminDashboardComponent } from './AdminDashboard/app.AdminDashboardComponent';
import { AdminLogoutComponent } from './Login/app.AdminLogout.Component';
import { AdminAuthGuardService } from './AuthGuard/AdminAuthGuardService';

import { LoginComponent } from './Login/app.LoginComponent';
import { UserLogoutComponent } from './Login/app.UserLogout.Component';
import { UserAuthGuardService } from './AuthGuard/UserAuthGuardService';

import { AppUserLayoutComponent } from './_layout/app-userlayout.component';
import { UserDashboardComponent } from './UserDashboard/app.UserDashboardComponent';
import { UserRegistrationComponent } from './CreateUsers/app.UserRegistration.component';
import { AllUserRegistrationComponent } from './CreateUsers/app.AllUserRegistration.component';
import { EditUserRegistrationComponent } from './CreateUsers/app.EditUserRegistration.component';
import { AllRoleComponent } from './RoleMaster/app.AllRole.component';
import { EditRoleComponent } from './RoleMaster/app.EditRole.component';
import { AssignRoleComponent } from './AssignRole/app.AssignRole.component';
import { CreateRoleComponent } from './RoleMaster/createRole.component';

import { MemberRegistrationComponent } from './MemberRegistration/app.MemberRegistration.component';
import { EditMemberRegistrationComponent } from './MemberRegistration/app.EditMemberRegistration.component';
import { MemberViewComponent } from './MemberRegistration/List/app.MemberViewComponent';
import { MemberDetailsReportComponent } from './Reports/app.MemberDetailsReport.Component';

import { PaymentOverviewComponent } from './Payment/List/app.PaymentOverviewComponent';
import { RenewalComponent } from './Renewal/app.Renewal.Component';
import { SchemeComponent } from './SchemeMasters/app.Scheme.Component';
import { AllSchemeComponent } from './SchemeMasters/app.AllScheme.Component';
import { EditSchemeComponent } from './SchemeMasters/app.EditScheme.Component';
import { PlanMasterComponent } from './PlanMaster/app.planmaster.component';
import { AllPlanMasterComponent } from './PlanMaster/app.allplanmaster.component';
import { EditPlanComponent } from './PlanMaster/app.EditPlan.component';
import { YearwiseReportComponent } from './Reports/app.YearwiseReport.Component';
import { MonthwiseReportComponent } from './Reports/app.MonthwiseReport.Component';
import { RenewalReportComponent } from './Reports/app.RenewalReport.Component';
import { GenerateRecepitComponent } from './Recepit/app.generateRecepit.Component';

const routes: Routes = [
  { path: 'Login', component: LoginComponent },
  { path: 'AdminLogout', component: AdminLogoutComponent },
  { path: 'UserLogout', component: UserLogoutComponent },
  {
    path: 'User',
    component: AppUserLayoutComponent,
    children: [
      { path: 'Dashboard', component: UserDashboardComponent, canActivate: [UserAuthGuardService] },
      { path: 'Recepit/:PaymentID', component: GenerateRecepitComponent, canActivate: [UserAuthGuardService] }
    ]
  },
  {
    path: 'Admin',
    component: AppAdminLayoutComponent,
    children: [
      { path: 'Dashboard', component: AdminDashboardComponent, canActivate: [AdminAuthGuardService] },
      { path: 'AllUsers', component: AllUserRegistrationComponent, canActivate: [AdminAuthGuardService] },
      { path: 'AddUser', component: UserRegistrationComponent, canActivate: [AdminAuthGuardService] },
      { path: 'EditUser/:UserId', component: EditUserRegistrationComponent }, //, canActivate: [AdminAuthGuardService] },
      { path: 'AllRoles', component: AllRoleComponent, canActivate: [AdminAuthGuardService] },
      { path: 'AddRole', component: CreateRoleComponent, canActivate: [AdminAuthGuardService] },
      { path: 'EditRole/:RoleID', component: EditRoleComponent, canActivate: [AdminAuthGuardService] },
      { path: 'AssignRole', component: AssignRoleComponent, canActivate: [AdminAuthGuardService] },
    ]
  },
  {
    path: 'Member',
    component: AppUserLayoutComponent,
    children: [
      { path: 'Add', component: MemberRegistrationComponent, canActivate: [UserAuthGuardService] },
      { path: 'Edit/:MemberId', component: EditMemberRegistrationComponent, canActivate: [UserAuthGuardService] },
      { path: 'All', component: MemberViewComponent, canActivate: [UserAuthGuardService] }
    ]
  },
  {
    path: 'Payment',
    component: AppUserLayoutComponent,
    children: [
      { path: 'Details', component: PaymentOverviewComponent, canActivate: [UserAuthGuardService] }
    ]
  },
  {
    path: 'Renewal',
    component: AppUserLayoutComponent,
    children: [
      { path: 'Renew', component: RenewalComponent, canActivate: [UserAuthGuardService] }
    ]
  },
  {
    path: 'Scheme',
    component: AppAdminLayoutComponent,
    children: [
      { path: 'Add', component: SchemeComponent, canActivate: [AdminAuthGuardService] },
      { path: 'Edit/:schemeId', component: EditSchemeComponent, canActivate: [AdminAuthGuardService] },
      { path: 'All', component: AllSchemeComponent, canActivate: [AdminAuthGuardService] }
    ]
  },
  {
    path: 'Plan',
    component: AppAdminLayoutComponent,
    children: [
      { path: 'All', component: AllPlanMasterComponent, canActivate: [AdminAuthGuardService] },
      { path: 'Add', component: PlanMasterComponent, canActivate: [AdminAuthGuardService] },
      { path: 'Edit/:PlanID', component: EditPlanComponent, canActivate: [AdminAuthGuardService] },
    ]
  },
  {
    path: 'Report',
    component: AppAdminLayoutComponent,
    children: [
      { path: 'Member', component: MemberDetailsReportComponent, canActivate: [AdminAuthGuardService] },
      { path: 'Yearwise', component: YearwiseReportComponent, canActivate: [AdminAuthGuardService] },
      { path: 'Monthwise', component: MonthwiseReportComponent, canActivate: [AdminAuthGuardService] },
      { path: 'Renewal', component: RenewalReportComponent, canActivate: [AdminAuthGuardService] }
    ]
  },
  { path: '', redirectTo: "Login", pathMatch: 'full' },
  { path: '**', redirectTo: "Login", pathMatch: 'full' },
];
export const RoutingConfig = RouterModule.forRoot(routes);
