import { Component, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';
import { PlataformDetectorService } from '../../core/plataform-detector/plataform-detector.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup | any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private renderer: Renderer2,
    private platFormDetectorService: PlataformDetectorService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    const userName = this.loginForm.get('userName').value;
    const password = this.loginForm.get('password').value;
    this.authService.authenticate(userName, password).subscribe({
      next: () => this.router.navigate(['user', userName]),

      error: (err) => {
        console.log(err);
        this.loginForm.reset();
        this.renderer.selectRootElement('#userNameInput').focus();
        alert('Invalid  username or password');
      },
      complete: () => console.log('Success'),
    });
  }
}
