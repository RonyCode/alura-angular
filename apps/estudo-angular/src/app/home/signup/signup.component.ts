import { Component, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lowerCaseValidator } from '../../shared/validators/validator/lower-case-validator';
import { UserNotTakenValidatorService } from './user-not-taken-validator.service';
import { NewUser } from './new-user';
import { SignUpService } from './signup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ap-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class SignupComponent implements OnInit {
  signForm: FormGroup | any;

  constructor(
    private formBuilder: FormBuilder,
    private checkUserTaken: UserNotTakenValidatorService,
    private signUpService: SignUpService,
    private route: Router,
    private elementDom: Renderer2
  ) {}

  ngOnInit() {
    this.elementDom.selectRootElement('#signUpFocus').focus();

    this.signForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],

      fullName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(40),
        ],
      ],

      userName: [
        '',
        [
          Validators.required,
          lowerCaseValidator,
          Validators.minLength(2),
          Validators.maxLength(30),
        ],
        this.checkUserTaken.checkUsernameTaken(),
      ],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(14),
        ],
      ],
    });
  }

  signUp() {
    const newUser = this.signForm.getRawValue() as NewUser;
    this.signUpService.signUp(newUser).subscribe({
      next: () => {
        this.route.navigate(['']);
      },
      error: (err) => console.log(err),
    });
  }
}
