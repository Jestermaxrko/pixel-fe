import { Routes } from '@angular/router';
import { MainLayoutComponent } from './modules/layout/components/main-layout/main-layout.component';
import { AuthLayoutComponent } from './modules/layout/components/auth-layout/auth-layout.component';
import { VerifyComponent } from './modules/verify/verify.component';

export const appRoutes: Routes = [
  { path: '', component: MainLayoutComponent,  pathMatch: 'full' },
  { path: 'sign-up', component: AuthLayoutComponent,  pathMatch: 'full' },
  { path: 'sign-in', component: AuthLayoutComponent },
  { path: 'verify', component: AuthLayoutComponent },
];

export default appRoutes;
