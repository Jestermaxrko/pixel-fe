import { Routes } from '@angular/router';
import { FeedComponent } from '../feed/feed.component';
import { ProfileComponent } from '../profile/profile.component';

export const mainLayoutRoutes: Routes = [
  {
    path: 'profile/:nickname',
    component: ProfileComponent,
  },
  {
    path: '',
    component: FeedComponent,
  },
];

export default mainLayoutRoutes;
