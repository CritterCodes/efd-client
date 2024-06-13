import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RepairsComponent } from './repairs/repairs.component';
import { RepairDetailsComponent } from './repair-details/repair-details.component';
import { NewRepairComponent } from './new-repair/new-repair.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { SignupComponent } from './signup/signup.component';
import { UsersComponent } from './users/users.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ConnectComponent } from './connect/connect.component';
import { CollectorProfileComponent } from './collector-profile/collector-profile.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RepairComponent } from './repair/repair.component';
import { RepairTasksComponent } from './repair-tasks/repair-tasks.component';
import { MoveComponent } from './move/move.component';

export const routes: Routes = [
  { path: 'landing-page', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'repairs', component: RepairsComponent, canActivate: [AuthGuard] },
        {path: 'repairs/:repairID', component: RepairComponent, canActivate: [AuthGuard], children:
              [
                { path: '', redirectTo: 'details', pathMatch: 'full' },
                { path: 'details', component: RepairDetailsComponent, canActivate: [AuthGuard] },
                { path: 'tasks', component: RepairTasksComponent, canActivate: [AuthGuard] },
                { path: 'location', component: MoveComponent, canActivate: [AuthGuard] }
              ]},
      { path: 'new-repair', component: NewRepairComponent, canActivate: [AuthGuard] },
      { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
      { path: 'users/:userID', component: UserDetailsComponent, canActivate: [AuthGuard] },
      { path: 'connect/:collectorID', component: ConnectComponent, canActivate: [AuthGuard] },
      { path: 'collectors/:username', component: CollectorProfileComponent }]
  },
  { path: '', redirectTo: '/landing-page', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },
];
