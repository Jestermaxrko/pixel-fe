import { Routes } from '@angular/router';
import { FeedComponent } from '../feed/feed.component';
import { UserPageComponent } from '../user-page/user-page.component';

export const mainLayoutRoutes: Routes = [
  { 
    path: 'user-page/:nickname', 
    component: UserPageComponent 
  },
  { 
    path: '',  
    component: FeedComponent  
  },
];

export default mainLayoutRoutes;
