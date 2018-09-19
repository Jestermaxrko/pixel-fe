import { Routes } from '@angular/router';
import { LayoutComponent } from './modules/layout/layout.component';

export const appRoutes: Routes = [
  { path: '', component: LayoutComponent,  pathMatch: 'full' },
  { path: 'sign-up', component: LayoutComponent,  pathMatch: 'full' },
  { path: 'sign-in', component: LayoutComponent },
];

export default appRoutes;
