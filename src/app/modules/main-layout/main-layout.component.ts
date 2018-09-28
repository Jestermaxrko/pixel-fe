import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { UsersService } from '../../../services/users.service';
import { AuthState, UsersState } from '../../../models/redux.state.model';
import { ModalWindowService } from '../../../services/modal-window.service';
import { ModalState } from '../../../models/modal-window.state.model';
import { Router } from '@angular/router';

@Component({
  templateUrl: './main-layout.component.html',
})

export class MainLayoutComponent implements OnInit {
  authState: AuthState;
  usersState: UsersState;
  modalState: ModalState;

  constructor (
    private authService: AuthService,
    private usersService: UsersService,
    private modalService: ModalWindowService,
    private router: Router) {
  }

  ngOnInit () {
    const accessToken: string = window.localStorage.getItem('authToken');
    this.modalService.getModalState().subscribe((res: any): void => { this.modalState = res; });
    this.usersService.getUsersState().subscribe((res: UsersState): void => { this.usersState = res; });

    this.authService.getAuthState().subscribe((res: AuthState): void => {
      this.authState = res;
      if (this.usersState.users === null && this.authState.user) {
        this.usersService.loadCurrentFollowings(this.authState.user);
      }
    });

    if (accessToken && !this.authState.isAuthorized) {
      this.authService.validateToken();
    }
  }

  handleCloseModal = () => {
    this.router.navigateByUrl(this.modalState.modalHolder);
    this.modalService.closeModal();
  }
}
