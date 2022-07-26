import { Injectable } from '@angular/core';
import { SignUpService } from './signup.service';
import { AbstractControl } from '@angular/forms';
import { first, map, switchMap } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Injectable()
export class UserNotTakenValidatorService {
  constructor(private signUpService: SignUpService) {}

  checkUsernameTaken() {
    return (control: AbstractControl) => {
      return control.valueChanges
        .pipe(debounceTime(500))
        .pipe(
          switchMap((userName) =>
            this.signUpService.checkUserNameTaken(userName)
          )
        )
        .pipe(map((isTaken) => (isTaken ? { userNameTaken: true } : null)))
        .pipe(first());
    };
  }
}
