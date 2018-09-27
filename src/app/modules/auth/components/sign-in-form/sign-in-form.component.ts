import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../../../../services/auth.service';
import { AuthState } from '../../../../../models/redux.state.model';
import { InputValidatorsService } from '../../../../../services/input-validators.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
})
export class SignInFormComponent implements OnDestroy {
  serverMsg: string;
  serverMsgClass: string;
  localForm: FormGroup;
  emailInp: AbstractControl;
  passwordInp: AbstractControl;
  authState: AuthState;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private validators: InputValidatorsService) {
    this.authService.getAuthState().subscribe((res: AuthState): void => { this.authState = res; });

    this.localForm = this.fb.group({
      email: ['', Validators.compose([
        Validators.required,
        this.validators.emailValidator,
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
      ])],
    });
    this.emailInp = this.localForm.controls['email'];
    this.passwordInp = this.localForm.controls['password'];
  }

  ngOnDestroy() {
    this.authService.clearErrors();
  }

  handleSubmit = (form: any): void => {
    if (this.localForm.valid) {
      this.authService.signIn(form.email, form.password);
    }
  }
}
