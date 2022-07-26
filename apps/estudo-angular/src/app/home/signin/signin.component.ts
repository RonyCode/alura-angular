import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';
import { PlatformDetectorService } from '../../core/plataform-detector/platform-detector.service';

@Component({
  templateUrl: './signin.component.html',
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup | any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private platformDetectorService: PlatformDetectorService,
    private elementDom: Renderer2
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.elementDom.selectRootElement('#userNameInput').focus();
  }

  login() {
    const userName = this.loginForm.get('userName').value;
    const password = this.loginForm.get('password').value;

    this.authService.authenticate(userName, password).subscribe(
      () => this.router.navigate(['user', userName]),
      (err) => {
        console.log(err);
        this.loginForm.reset();
        this.elementDom.selectRootElement('#userNameInput').focus();
        alert('Invalid user name or password');
      }
    );
  }
}
