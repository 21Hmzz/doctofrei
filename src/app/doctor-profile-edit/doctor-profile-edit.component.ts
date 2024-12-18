import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { RendezVousService } from '../services/rendezvous.service';
import { User } from '../../database/types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-profile-edit',
  templateUrl: './doctor-profile-edit.component.html',
})
export class DoctorProfileEditComponent implements OnInit {
  doctorForm!: FormGroup;
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
    this.doctorForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: [''],
      address: [''],
      city: [''],
    });
    this.authService.getUserInfo().subscribe((user) => {
      if (user) {
        this.user = user;
        this.doctorForm.patchValue({
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
    if (this.doctorForm.valid) {
      this.http
        .patch<User>(`${this.apiUrl}/${this.user.id}`, {
          nom: this.doctorForm.value.firstName,
          prenom: this.doctorForm.value.lastName,
          telephone: this.doctorForm.value.phone,
          adresse: this.doctorForm.value.address,
          ville: this.doctorForm.value.city,
        })
        .subscribe((response) => {
          this.router.navigate(['/pro/dashboard']).then();
        });
    }
  }
}
