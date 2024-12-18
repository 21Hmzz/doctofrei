import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { RendezVousService } from '../services/rendezvous.service';
import { User } from '../../database/types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-profile-edit',
  templateUrl: './patient-profile-edit.component.html',
})
export class PatientProfileEditComponent implements OnInit {
  patientForm!: FormGroup;
  user!: User;
  apiUrl = 'http://localhost:3000/utilisateurs';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private authService: AuthService,
    private rendezVousService: RendezVousService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.patientForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
    });

    this.authService.getUserInfo().subscribe((user) => {
      if (user) {
        this.user = user;
        this.patientForm.patchValue({
          firstName: this.user.nom,
          lastName: this.user.prenom,
          phone: this.user.telephone,
          address: this.user.adresse,
          city: this.user.ville,
        });
      } else {
        console.error('User not found');
      }
    });
  }

  onSubmit(): void {
    if (this.patientForm.valid) {
      this.http
        .patch<User>(`${this.apiUrl}/${this.user.id}`, {
          nom: this.patientForm.value.firstName,
          prenom: this.patientForm.value.lastName,
          telephone: this.patientForm.value.phone,
          adresse: this.patientForm.value.address,
          ville: this.patientForm.value.city,
        })
        .subscribe((response) => {
          this.router.navigate(['/patient-profile']);
        });
    }
  }
}
