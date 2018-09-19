import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../../services/authService';

import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html'
})
export class SignInFormComponent implements OnInit {
  serverMsg: string;
  serverMsgClass: string;
  localForm: FormGroup;
  emailInp: AbstractControl;
  passwordInp: AbstractControl;
  authState: Object;

  constructor(fb: FormBuilder, private authService: AuthService) {
    this.localForm = fb.group({
      'email': ['', Validators.compose([
        Validators.required,
        this.emailValidator
      ])],
      'password': ['', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])],
    });

    this.emailInp = this.localForm.controls['email'];
    this.passwordInp = this.localForm.controls['password'];
  }

  handleSubmit = (form: any): void => {
    if (this.localForm.valid) {
      this.serverMsg = 'Loged in';
      this.serverMsgClass = 'server-msg_success';
      this.authService.loginUser(form.email, form.password);
    } else {
      this.serverMsg = 'Form is invalid';
      this.serverMsgClass = 'server-msg_err';
    }
  }

  emailValidator = (control: FormControl): { [s: string]: boolean } => {
    if (control.value !== '') {
      if (!control.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
        return { emailInvalid: true };
      }
    }
  }

  ngOnInit() {
    this.authService.getAuthState().subscribe((res) => {this.authState = res; });
  }
}
