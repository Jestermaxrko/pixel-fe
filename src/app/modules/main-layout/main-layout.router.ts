import { Routes } from '@angular/router';
import { FeedComponent } from '../feed/feed.component';
import { ProfileComponent } from '../profile/profile.component';
import { PostPageComponent } from '../post-page/post-page.component';
import { PostUploadComponent } from '../post-upload/post-upload.component';

export const mainLayoutRoutes: Routes = [
  {
    path: 'profile/:nickname',
    component: ProfileComponent,
  },
  {
    path: '',
    component: FeedComponent,
  },
  {
    path: 'post/:id',
    component: PostPageComponent,
  },
  {
    path: 'upload',
    component: PostUploadComponent,
  },
];

export default mainLayoutRoutes;
