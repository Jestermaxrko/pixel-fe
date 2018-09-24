import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../services/auth.service';
import { Auth } from '../../../../../models/auth';

@Component({
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent implements OnInit {
  auth: Auth;
  pagePath: String;

  constructor (
    private authService: AuthService,
    private router: Router) {
    this.router.events.subscribe((): void => { this.pagePath = this.router.url; });
  }

  async ngOnInit () {
    const accessToken = window.localStorage.getItem('authToken');
    await this.authService.getAuthState().subscribe((res): void => { this.auth = res; });

    if (accessToken && !this.auth.isAuthorized) {
      this.authService.validateToken();
    }

    if (!this.auth.isAuthorized && !this.auth.loading) { this.router.navigateByUrl('/sign-in'); }
  }
}