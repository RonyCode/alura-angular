import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ap-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class SignupComponent implements OnInit {
  signForm: FormGroup | any;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
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
          Validators.pattern(/^[a-z\d_\-]+$/),
          Validators.minLength(2),
          Validators.maxLength(30),
        ],
      ],

      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-z\d_\-]+$/),
          Validators.minLength(2),
          Validators.maxLength(30),
        ],
      ],
    });
  }
}
