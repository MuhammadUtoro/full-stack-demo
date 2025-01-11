import { Component } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {
  RegistrationService,
  UserRegistrationDTO,
} from '../../services/registration.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent {
  registrationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private registrationService: RegistrationService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.registrationForm = this.formBuilder.group({
      userEmail: ['', [Validators.required, Validators.email]],
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  // Function to submit the form
  submit(): void {
    if (this.registrationForm.invalid) {
      this.snackBar.open('Please complete the form', 'Close', {
        duration: 1200,
      });
      return;
    }
    const userRegistrationDTO: UserRegistrationDTO =
      this.registrationForm.value;
    this.registrationService.userRegister(userRegistrationDTO).subscribe({
      next: (res) => {
        this.snackBar.open('Registration success!', 'Close', {
          duration: 1200,
        });
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.snackBar.open('Registration failed!', 'Close', {
          duration: 1200,
        });
      },
    });
  }
}
