import { AuthenticationService } from './../../services/authentication.service';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public loginForm: FormGroup = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ],
    ],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    if (this.authService.userValue) {
      this.router.navigate(['/product-list']);
    }
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.authService
      .login(this.emailForm.value, this.passwordForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          const returnUrl =
            this.route.snapshot.queryParams['returnUrl'] || '/product-list';
          this.router.navigateByUrl(returnUrl);
        },
        error: (error) => {
          this.error = error.error.message;
        },
      });
  }

  get emailForm() {
    return this.loginForm.get('email') as FormArray;
  }

  get passwordForm() {
    return this.loginForm.get('password') as FormArray;
  }
}
