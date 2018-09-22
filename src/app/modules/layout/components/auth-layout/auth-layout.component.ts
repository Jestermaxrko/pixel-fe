import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../services/auth.service';
import { Auth } from '../../../../../models/auth';

@Component({
  templateUrl: './auth-layout.component.html',
})

export class AuthLayoutComponent implements OnInit {
  auth: Auth;
  pagePath: String;
  constructor (
    private authService: AuthService,
    private router: Router) {
    this.router.events.subscribe((): void => {
      this.pagePath = this.router.url.includes('/verify?') ? '/verify' : this.router.url;
    });
  }

  async ngOnInit () {
    const accessToken = window.localStorage.getItem('authToken');
    this.authService.clearErrors();
    await this.authService.getAuthState().subscribe((res): void => { this.auth = res; });

    if (accessToken && !this.auth.isAuthorized) {
      await this.authService.validateToken();
    }

    if (this.auth.isAuthorized) { this.router.navigateByUrl('/'); }
  }
}
