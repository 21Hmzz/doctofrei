import { Component, OnInit } from '@angular/core';
import { SpecialiteService } from '../services/specialite.service';
import { Specialite } from 'src/database/types';
@Component({
  selector: 'app-specialites',
  templateUrl: './specialites.component.html',
  styleUrls: ['./specialites.component.css']
})
export class SpecialitesComponent implements OnInit {

  specialites: Specialite[] = [];

  constructor(private specialiteService: SpecialiteService) {}

  ngOnInit(): void {
    // Appel au service pour récupérer les spécialités
    this.specialiteService.getSpecialites().subscribe({
      next: (data) => {
        this.specialites = data; // Remplir le tableau avec les données récupérées
      },
      error: (err) => {
        console.error('Erreur de récupération des spécialités : ', err);
      }
    });
  }
}
