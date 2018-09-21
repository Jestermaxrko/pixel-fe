import { Component } from '@angular/core';
import { AuthService } from '../../../../../services/auth.service';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
})
export class HeaderNavComponent {
  constructor(private authService: AuthService) { }

  handleSignOut = (): void => this.authService.signOut();
}
