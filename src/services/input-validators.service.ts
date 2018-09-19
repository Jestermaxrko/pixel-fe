import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class InputValidatorsService {
  constructor() { }

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

  passwordConfValidator = (control: any): { [s: string]: boolean } => {
    if (control.value !== '' && control.value !== control.parent.controls.password.value) {
      return { passwordMismatch: true };
    }
  }
}
