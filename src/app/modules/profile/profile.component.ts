import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  nickname: string;
  authState: Object;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService) {
  }

  async ngOnInit() {
    await this.authService.getAuthState().subscribe((res: any): void => { this.authState = res; });
    this.route.params.subscribe((params: any): void => { this.nickname = params['nickname']; });
  }
}
