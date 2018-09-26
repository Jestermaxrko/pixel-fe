import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { AuthState } from '../../../models/auth-state.model';

@Component({
  templateUrl: './main-layout.component.html',
})

export class MainLayoutComponent implements OnInit {
  auth: AuthState;
  pagePath: String;

  constructor (
    private authService: AuthService,
    private router: Router) {
    this.router.events.subscribe((): void => { this.pagePath = this.router.url; });
  }

  ngOnInit () {
    const accessToken = window.localStorage.getItem('authToken');
    this.authService.getAuthState().subscribe((res: any): void => { this.auth = res; });

    if (accessToken && !this.auth.isAuthorized) {
      this.authService.validateToken();
    }
  }
}
