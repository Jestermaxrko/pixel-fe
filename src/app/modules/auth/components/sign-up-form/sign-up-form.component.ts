import { Component, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html'
})
export class SignUpFormComponent implements OnInit {
  password: string;
  serverMsg: string;
  serverMsgClass: string;
  localForm: FormGroup;
  nicknameInp: AbstractControl;
  emailInp: AbstractControl;
  passwordInp: AbstractControl;
  confPasswordInp: AbstractControl;

  constructor(fb: FormBuilder) {
    this.localForm = fb.group({
      'nickname': ['', Validators.compose([
        Validators.required,
        this.nicknameValidator
      ])],
      'email': ['', Validators.compose([
        Validators.required,
        this.emailValidator
      ])],
      'password': ['', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])],
      'confPassword': ['', Validators.compose([
        Validators.required,
        this.passwordConfValidator
      ])]
    });

    this.nicknameInp = this.localForm.controls['nickname'];
    this.emailInp = this.localForm.controls['email'];
    this.passwordInp = this.localForm.controls['password'];
    this.confPasswordInp = this.localForm.controls['confPassword'];
  }

  handleSubmit = (form: any): void => {
    if (this.localForm.valid) {
      this.serverMsg = 'Check your email now';
      this.serverMsgClass = 'server-msg_success';
    } else {
      this.serverMsg = 'Form is invalid';
      this.serverMsgClass = 'server-msg_err';
    }
  }

  setPassword = (password: string): void => {
    this.password = password;
  }

  nicknameValidator = (control: FormControl): { [s: string]: boolean } => {
    if (control.value !== '') {
      if (!control.value.match(/^[A-Za-z]/)) {
        return { firstCharErr: true };
      }

      if (control.value.length < 6) {
        return { lessThatSixChar: true };
      }

      if (!control.value.match(/^[A-Za-z][A-Za-z0-9_]*$/)) {
        return { charachtersErr: true };
      }

      if (control.value.length > 14) {
        return { tooManyChar: true };
      }
    }
  }

  emailValidator = (control: FormControl): { [s: string]: boolean } => {
    if (control.value !== '') {
      if (!control.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
        return { emailInvalid: true };
      }
    }
  }

  passwordConfValidator = (control: FormControl): { [s: string]: boolean } => {
    if (control.value !== '' && control.value !== this.password) {
      return { passwordMismatch: true };
    }
  }

  ngOnInit() {}
}
