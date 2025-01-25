import { afterNextRender, Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService, UserLoginDTO } from '../../services/login.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      userEmail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  // Function to submit form
  login(): void {
    if (this.loginForm.invalid) {
      this.snackBar.open('Login failed! Check your credentials!', 'Close', {
        duration: 1200,
      });
      return;
    }
    const userLoginDTO: UserLoginDTO = this.loginForm.value;

    this.loginService.userLogin(userLoginDTO).subscribe({
      next: (response) => {
        if (response && response.token) {
          this.loginService.storeToken(response.token);

          this.snackBar.open('Login Success!', 'Close', {
            duration: 1200,
          });

          // Redirect to users page
          this.router.navigate(['/users']);
        } else {
          this.snackBar.open('Login Failed!', 'Close', {
            duration: 1200,
          });
        }
      },
      error: (err) => {
        this.snackBar.open('Login failed!', 'Close', {
          duration: 1200,
        });
      },
    });
  }
}
