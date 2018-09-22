import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../../services/auth.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { InputValidatorsService } from '../../../../../services/input-validators.service';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
})
export class SignUpFormComponent implements OnInit {
  localForm: FormGroup;
  nicknameInp: AbstractControl;
  emailInp: AbstractControl;
  passwordInp: AbstractControl;
  confPasswordInp: AbstractControl;
  authState: Object;

  constructor(
    private fb: FormBuilder,
    private validators: InputValidatorsService,
    private authService: AuthService) {
  }

  async ngOnInit() {
    this.authService.getAuthState().subscribe((res) => { this.authState = res; });

    this.localForm = this.fb.group({
      nickname: ['', Validators.compose([
        Validators.required,
        this.validators.nicknameValidator,
      ])],
      email: ['', Validators.compose([
        Validators.required,
        this.validators.emailValidator,
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
      ])],
      confPassword: ['', Validators.compose([
        Validators.required,
        this.validators.passwordConfValidator,
      ])],
    });
    this.nicknameInp = this.localForm.controls['nickname'];
    this.emailInp = this.localForm.controls['email'];
    this.passwordInp = this.localForm.controls['password'];
    this.confPasswordInp = this.localForm.controls['confPassword'];
  }

  handleSubmit = (form: any): void => {
    if (this.localForm.valid) {
      this.authService.signUp(form.email, form.nickname, form.password, form.confPassword);
    }
  }
}
