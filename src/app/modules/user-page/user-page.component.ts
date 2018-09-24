import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
})
export class UserPageComponent implements OnInit {
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
