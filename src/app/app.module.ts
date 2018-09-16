import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MaterialModule } from './material';
import { AuthComponent } from './modules/auth/auth.component';
import { FeedComponent } from './modules/feed/feed.component';
import { appRoutes } from './app.router';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { AuthService } from '../services/authService';
import { AuthApi } from '../api/authApi';

import { SignUpFormComponent } from './modules/auth/components/sign-up-form/sign-up-form.component';
import { SignInFormComponent } from './modules/auth/components/sign-in-form/sign-in-form.component';
import { ServerMsgComponent } from './shared/server-msg/server-msg.component';

import { reducers } from '../reducers';
import { LayoutComponent } from './modules/layout/layout.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    SignUpFormComponent,
    SignInFormComponent,
    ServerMsgComponent,
    FeedComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot( appRoutes ),
    MaterialModule,
    StoreModule.forRoot(reducers),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [AuthService, AuthApi],
  bootstrap: [AppComponent]
})
export class AppModule { }
