import { Component, Input } from '@angular/core';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-like-btn',
  templateUrl: './like-btn.component.html',
})
export class LikeBtnComponent {
  @Input() infoID: string;
  @Input() like: boolean;

  constructor(
    private usersService: UsersService,
  ) { }

  handleFavorite = (): void => {
    const data = {
      like: !this.like,
      followingInfoId: this.infoID,
    };

    this.usersService.handleFavorite(data);
  }
}
