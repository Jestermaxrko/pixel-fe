import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../../services/auth.service';
import { Auth } from '../../../../../models/auth';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
})
export class HeaderNavComponent implements OnInit {
  auth: Auth;

  constructor(private authService: AuthService) { }

  async ngOnInit() {
    await this.authService.getAuthState().subscribe((res): void => { this.auth = res; });
  }

  handleSignOut = (): void => this.authService.signOut();
}
