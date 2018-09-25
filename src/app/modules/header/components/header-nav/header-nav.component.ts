import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../../services/auth.service';
import { AuthState } from '../../../../../models/auth-state.model';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
})
export class HeaderNavComponent implements OnInit {
  auth: AuthState;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getAuthState().subscribe((res): void => { this.auth = res; });
  }

  handleSignOut = (): void => this.authService.signOut();
}
