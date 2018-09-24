import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../../services/auth.service';
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
export class SignInFormComponent implements OnInit {
  serverMsg: string;
  serverMsgClass: string;
  localForm: FormGroup;
  emailInp: AbstractControl;
  passwordInp: AbstractControl;
  authState: Object;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private validators: InputValidatorsService) {
  }

  ngOnInit() {
    this.authService.getAuthState().subscribe((res) => { this.authState = res; });

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
    } else {
      this.serverMsg = 'Form is invalid';
      this.serverMsgClass = 'server-msg--err';
    }
  }
}
