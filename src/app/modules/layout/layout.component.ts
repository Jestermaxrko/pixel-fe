import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute
} from '@angular/router';
import { AuthService } from '../../../services/authService';
import { access } from 'fs';

interface User {
  user: {
    name: String
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

  constructor(
    private authService: AuthService,
    private router: Router  ) {
      this.router.events.subscribe((): void => {this.pagePath = this.router.url; });
  }

  async ngOnInit () {
    const accessToken = window.localStorage.getItem('authToken');
    console.log(accessToken);
    await this.authService.getAuthState().subscribe((res): void => { this.auth = res; });

    if (accessToken && !this.auth.login) {
      console.log('Res');
      await this.authService.validateToken();
    }

    if (!this.auth.loading) {
      if (!this.auth.login) { this.router.navigateByUrl('/sign-in'); } else { this.router.navigateByUrl('/'); }
    }

    // this.pagePath = '/sign-up';
    // console.log(this.router.snapshot.url[0].path);
    // this.pagePath = `/${this.router.snapshot.url[0].path}`;

  }
}
