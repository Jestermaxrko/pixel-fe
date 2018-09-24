import { Routes } from '@angular/router';
import { SignedInGuard } from '../guards/signed-in.guard';
import { SignedOutGuard } from '../guards/signed-out.guard';
import { mainLayoutRoutes } from './modules/main-layout/main-layout.router';
import { authLayoutRoutes } from './modules/auth-layout/auth-layout.router';
import { MainLayoutComponent } from './modules/main-layout/main-layout.component';
import { PageNotFoudComponent } from './modules/page-not-foud/page-not-foud.component';
import { AuthLayoutComponent } from './modules/auth-layout/auth-layout.component';

export const appRoutes: Routes = [
  {
    path: 'auth', 
    component: AuthLayoutComponent,
    children: authLayoutRoutes,
    canActivate: [ SignedOutGuard ],
  },
  {
    path: '', 
    component: MainLayoutComponent,
    children: mainLayoutRoutes,
    canActivate: [ SignedInGuard ],
  },
  {
    path: '**',
    component: PageNotFoudComponent
  },
];

export default appRoutes;
