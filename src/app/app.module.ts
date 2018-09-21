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
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ScrollbarModule } from 'ngx-scrollbar';
// apis
import { AuthApi } from '../api/auth';
import { SearchApi } from '../api/search';
// services
import { AuthService } from '../services/auth.service';
import { InputValidatorsService } from '../services/input-validators.service';
// components
import { SignUpFormComponent } from './modules/auth/components/sign-up-form/sign-up-form.component';
import { SignInFormComponent } from './modules/auth/components/sign-in-form/sign-in-form.component';
import { ServerMsgComponent } from './shared/server-msg/server-msg.component';
import { LayoutComponent } from './modules/layout/layout.component';
import { HeaderComponent } from './modules/header/header.component';
import { HeaderNavComponent } from './modules/header/components/header-nav/header-nav.component';
import { SearchBoxComponent } from './modules/header/components/search-box/search-box.component';
import { SearchInpComponent } from './modules/header/components/search-inp/search-inp.component';
import { AuthComponent } from './modules/auth/auth.component';
import { FeedComponent } from './modules/feed/feed.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    SignUpFormComponent,
    SignInFormComponent,
    ServerMsgComponent,
    FeedComponent,
    LayoutComponent,
    HeaderComponent,
    HeaderNavComponent,
    SearchBoxComponent,
    SearchInpComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    MaterialModule,
    StoreModule.forRoot(reducers),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    ScrollbarModule,
  ],
  providers: [
    AuthService,
    AuthApi,
    InputValidatorsService,
    SearchApi,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
