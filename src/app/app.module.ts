import { appRoutes } from './app.router';
import { reducers } from '../reducers/app.reducer';
// modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { TimeagoModule } from 'ngx-timeago';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';  // devtolls extension
// apis
import { AuthApi } from '../api/auth.api';
import { SearchApi } from '../api/search.api';
import { PostsApi } from '../api/posts.api';
import { UsersApi } from '../api/users.api';
// services
import { AuthService } from '../services/auth.service';
import { InputValidatorsService } from '../services/input-validators.service';
import { UsersService } from '../services/users.service';
import { PostsService } from '../services/posts.service';
// components
import { SignUpFormComponent } from './modules/auth/components/sign-up-form/sign-up-form.component';
import { SignInFormComponent } from './modules/auth/components/sign-in-form/sign-in-form.component';
import { ServerMsgComponent } from './shared/server-msg/server-msg.component';
import { HeaderComponent } from './modules/header/header.component';
import { MainLayoutComponent } from './modules/main-layout/main-layout.component';
import { HeaderNavComponent } from './modules/header/components/header-nav/header-nav.component';
import { SearchBoxComponent } from './modules/header/components/search-box/search-box.component';
import { SearchInpComponent } from './modules/header/components/search-inp/search-inp.component';
import { AuthComponent } from './modules/auth/auth.component';
import { FeedComponent } from './modules/feed/feed.component';
import { AppComponent } from './app.component';
import { VerifyComponent } from './modules/verify/verify.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { PageNotFoudComponent } from './modules/page-not-foud/page-not-foud.component';
import { AuthLayoutComponent } from './modules/auth-layout/auth-layout.component';
import { FeedlineComponent } from './modules/feed/components/feedline/feedline.component';
import { PostComponent } from './modules/feed/components/post/post.component';
import { PostHeaderComponent } from './modules/feed/components/post-header/post-header.component';
import { PostFooterComponent } from './modules/feed/components/post-footer/post-footer.component';
import { UpstairButtonComponent } from './shared/upstair-button/upstair-button.component';
import { PostPageComponent } from './modules/post-page/post-page.component';
import { DashboardComponent } from './modules/profile/components/dashboard/dashboard.component';
import { FollowBtnComponent } from './shared/follow-btn/follow-btn.component';
import { UnfollowBtnComponent } from './shared/unfollow-btn/unfollow-btn.component';
import { ModalWindowComponent } from './modules/modal-window/modal-window.component';
import { UsersListComponent } from './shared/users-list/users-list.component';
import { UserItemComponent } from './shared/users-list/components/user-item/user-item.component';
import { UserPostsComponent } from './modules/profile/components/user-posts/user-posts.component';
import { MinimizedPostComponent } from './modules/profile/components/minimized-post/minimized-post.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    SignUpFormComponent,
    SignInFormComponent,
    ServerMsgComponent,
    FeedComponent,
    HeaderComponent,
    HeaderNavComponent,
    SearchBoxComponent,
    SearchInpComponent,
    MainLayoutComponent,
    VerifyComponent,
    SpinnerComponent,
    ProfileComponent,
    PageNotFoudComponent,
    AuthLayoutComponent,
    FeedlineComponent,
    PostComponent,
    PostHeaderComponent,
    PostFooterComponent,
    UpstairButtonComponent,
    PostPageComponent,
    DashboardComponent,
    FollowBtnComponent,
    UnfollowBtnComponent,
    ModalWindowComponent,
    UsersListComponent,
    UserItemComponent,
    UserPostsComponent,
    MinimizedPostComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    TimeagoModule.forRoot(),
    MaterialModule,
    StoreModule.forRoot(reducers),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    VirtualScrollerModule,
    StoreDevtoolsModule.instrument({
      maxAge: 10,
    }),
  ],
  exports: [
    TimeagoModule,
  ],
  providers: [
    AuthApi,
    UsersApi,
    SearchApi,
    PostsApi,
    UsersService,
    PostsService,
    AuthService,
    InputValidatorsService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
