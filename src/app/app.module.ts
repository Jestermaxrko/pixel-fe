import { appRoutes } from './app.router';
import { reducers } from '../reducers';
// modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { VirtualScrollModule } from 'ngx-virtual-scroller';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ScrollbarModule } from 'ngx-scrollbar';
import { TimeagoModule } from 'ngx-timeago';
// apis
import { AuthApi } from '../api/auth';
import { SearchApi } from '../api/search';
import { PostsApi } from '../api/posts';
// services
import { AuthService } from '../services/auth.service';
import { InputValidatorsService } from '../services/input-validators.service';
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
import { UserPageComponent } from './modules/user-page/user-page.component';
import { PageNotFoudComponent } from './modules/page-not-foud/page-not-foud.component';
import { AuthLayoutComponent } from './modules/auth-layout/auth-layout.component';
import { FeedlineComponent } from './modules/feed/components/feedline/feedline.component';
import { PostComponent } from './modules/feed/components/post/post.component';
import { PostHeaderComponent } from './modules/feed/components/post-header/post-header.component';
import { PostFooterComponent } from './modules/feed/components/post-footer/post-footer.component';
import { UpstairButtonComponent } from './shared/upstair-button/upstair-button.component';

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
    UserPageComponent,
    PageNotFoudComponent,
    AuthLayoutComponent,
    FeedlineComponent,
    PostComponent,
    PostHeaderComponent,
    PostFooterComponent,
    UpstairButtonComponent,
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
    ScrollbarModule,
    VirtualScrollModule,
  ],
  exports: [
    TimeagoModule,
    VirtualScrollModule,
  ],
  providers: [
    AuthService,
    AuthApi,
    InputValidatorsService,
    SearchApi,
    PostsApi,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
