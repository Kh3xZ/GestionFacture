import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { layout } from './layout';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FacturesComponent } from './components/factures/factures.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },

  { 
    path: '',
    component: layout,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'Factures', pathMatch: 'full' },
      { path: 'Dashboard', component: DashboardComponent },
      { path: 'Factures', component: FacturesComponent },
    ]
  },

  { path: '**', redirectTo: '' }
];
