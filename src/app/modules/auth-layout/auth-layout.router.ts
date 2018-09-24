import { Routes } from '@angular/router';
import { AuthComponent } from '../auth/auth.component';
import { VerifyComponent } from '../verify/verify.component';

export const authLayoutRoutes: Routes = [
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full',
  },
  {
    path: 'sign-up',
    component: AuthComponent,
  },
  {
    path: 'sign-in',
    component: AuthComponent,
  },
  {
    path: 'verify',
    component: VerifyComponent,
  },
];

export default authLayoutRoutes;
