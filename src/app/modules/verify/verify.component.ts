import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './verify.component.html',
  selector: 'app-verify',
})
export class VerifyComponent implements OnInit {
  authState: Object;
  redirectTimer: number = 5;
  timerStarted: boolean = false;
  
  constructor(
    private authService: AuthService, 
    private router: Router) {
  }

  async ngOnInit() {
    await this.authService.getAuthState().subscribe((res: any) => { this.authState = res; });
    this.authService.verifyEmail(window.location.search);
  }

  startRedirectTimer(): void {
    if (!this.timerStarted) {
      this.timerStarted = true;
      const timer = setInterval(
        (): void => {
          this.redirectTimer = this.redirectTimer - 1;
          if (this.redirectTimer === 0) {
            clearInterval(timer);
            this.router.navigateByUrl('/auth/sign-in');
          }
        },
        1000
      );
    }
  }
}
