import { Component, HostBinding, Input } from '@angular/core';
import { User } from '../../../models/user.model';
import { ModalWindowService } from '../../../services/modal-window.service';

interface Payload {
  users: User[];
  icon: string;
  title: string;
}

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
})

export class UsersListComponent {
  @HostBinding('class') classes = 'users-list';
  @Input() payload: Payload;
  constructor(private modalService: ModalWindowService) { }

  handeCloseModal = (): void => {
    this.modalService.closeModal();
  }
}
