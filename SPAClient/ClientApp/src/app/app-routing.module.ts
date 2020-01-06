import { Routes, RouterModule } from '@angular/router';

import { AppAdminLayoutComponent } from './_layout/app-adminlayout.component';
import { AdminDashboardComponent } from './AdminDashboard/app.AdminDashboardComponent';
import { PaymentOverviewComponent } from './Payment/List/paymentOverview.component';

import { AdminAuthGuardService } from './AuthGuard/AdminAuthGuardService';
import { LoginComponent } from './Login/login.component';
import { AdminLogoutComponent } from './Login/adminLogout.сomponent';
import { UserLogoutComponent } from './Login/userLogout.component';
import { UserAuthGuardService } from './AuthGuard/UserAuthGuardService';

import { AppUserLayoutComponent } from './_layout/app-userlayout.component';
import { UserDashboardComponent } from './UserDashboard/userDashboard.component';
 
import { AllRoleComponent } from './Role/allRoles.component';
import { CreateRoleComponent } from './Role/createRole.component';
import { EditRoleComponent } from './Role/editRole.component';
import { AssignRoleComponent } from './Role/assignRole.component';

import { MemberRegistrationComponent } from './MemberRegistration/memberRegistration.component';
import { EditMemberRegistrationComponent } from './MemberRegistration/editMemberRegistration.component';
import { MemberViewComponent } from './MemberRegistration/List/memberView.component';
import { MemberDetailsReportComponent } from './Reports/app.MemberDetailsReport.Component';
import { RenewalComponent } from './Renewal/renewal.component';
import { SchemeComponent } from './SchemeMasters/Scheme.Component';
import { AllSchemeComponent } from './SchemeMasters/allScheme.component';
import { EditSchemeComponent } from './SchemeMasters/editScheme.component';
import { PlanMasterComponent } from './PlanMaster/planmaster.component';
import { AllPlanMasterComponent } from './PlanMaster/allplanmaster.component';
import { EditPlanComponent } from './PlanMaster/editPlan.component';
import { YearwiseReportComponent } from './Reports/app.YearwiseReport.Component';
import { MonthwiseReportComponent } from './Reports/app.MonthwiseReport.Component';
import { RenewalReportComponent } from './Reports/app.RenewalReport.Component';
import { GenerateRecepitComponent } from './Recepit/app.generateRecepit.Component';
import { AllUserRegistrationComponent } from './User/allUserRegistration.component';
import { UserRegistrationComponent } from './User/userRegistration.component';
import { EditUserComponent } from './User/editUser.component';

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
      { path: 'EditUser/:UserId', component: EditUserComponent }, //, canActivate: [AdminAuthGuardService] },
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
