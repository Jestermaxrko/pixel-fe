import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
  @Input() title: string;
  nickname: string;
  confPassword: string;

  constructor() {}
  ngOnInit() {}

  handleSignUp = (nickname: string, email: string, password: string, confPassword: string): void => {
    console.log(nickname, email, password, confPassword);
  };

  handleSignIn = (email: string, password: string): void => {
    console.log(email, password);
  };

  setNickname = (nickname: string): void => {
    this.nickname = nickname;
  };

  setConfPassword = (confPassword: string): void => {
    this.confPassword = confPassword;
  };
}
