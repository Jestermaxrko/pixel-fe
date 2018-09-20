import { Component, OnInit } from '@angular/core';
import {
  Router,
} from '@angular/router';
import { AuthService } from '../../../services/auth-service';

interface User {
  user: {
    name: String,
  };
}

interface Auth {
  login: boolean;
  loading: boolean;
}

@Component({
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnInit {
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

    if (accessToken && !this.auth.login) {
      await this.authService.validateToken();
    }

    if (!this.auth.loading) {
      if (!this.auth.login) { this.router.navigateByUrl('/sign-in'); } else { this.router.navigateByUrl('/'); }
    }
  }
}
