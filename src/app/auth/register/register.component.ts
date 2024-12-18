import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import * as bcrypt from 'bcryptjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nom: [
        '',
        [Validators.required],
      ],
      prenom: [
        '',
        [Validators.required],
      ],
      email: [
        '',
        [Validators.required, Validators.email],
      ],
      password: [
        '',
        [Validators.required, Validators.minLength(6)],
      ],
      confirmPassword: [
        '',
        [Validators.required, this.passwordMatchValidator.bind(this)],
      ],
      telephone: [
        '',
        [Validators.required],
      ],
      dateNaissance: [
        '',
        [Validators.required],
      ],
      adresse: [
        '',
        [Validators.required],
      ],
      ville: [
        '',
        [Validators.required],
      ],
      codePostal: [
        '',
        [Validators.required],
      ],
    });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = this.registerForm?.get('password')?.value;
    return control.value === password ? null : {mismatch: true};
  }

  onSubmit(): void {
    console.log(this.registerForm.value);
    if (this.registerForm.invalid) {
      return;
    }

    let { confirmPassword, ...newClient } = this.registerForm.value;

    newClient.createdAt = new Date();
    newClient.password = bcrypt.hashSync(newClient.password, 10);
    newClient.role = "client" // not sure

    this.authService.register(newClient).subscribe({
      next: (response) => {
        console.log('User registered successfully', response);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Registration failed', err);
      }
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }
}
