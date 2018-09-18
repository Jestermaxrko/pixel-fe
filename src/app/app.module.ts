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
import { SignUpFormComponent } from './modules/auth/components/sign-up-form/sign-up-form.component';
import { SignInFormComponent } from './modules/auth/components/sign-in-form/sign-in-form.component';
import { ServerMsgComponent } from './shared/server-msg/server-msg.component';

const appRoutes: Routes = [
  {
    path: '',
    component: AppComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    SignUpFormComponent,
    SignInFormComponent,
    ServerMsgComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
