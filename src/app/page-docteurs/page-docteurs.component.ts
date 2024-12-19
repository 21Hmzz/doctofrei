import { Component } from '@angular/core';
import { DocteurComplet } from 'src/database/types';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-page-docteurs',
  templateUrl: './page-docteurs.component.html',
  styleUrls: ['./page-docteurs.component.css']
})
export class PageDocteursComponent {
  
  docteurs: DocteurComplet[] = [];
  isLoading = true;

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.searchService.getCompleteDoctors().subscribe({
      next: (data) => {
        this.docteurs = data;
        this.isLoading = false;
        console.log("elvis", this.docteurs)
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des docteurs', err);
        this.isLoading = false;
      }
    });
  }

}
