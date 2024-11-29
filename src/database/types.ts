interface Docteur {
  id: number;
  nom: string;
  prenom: string;
  specialites: number[];
  adresse: string;
  ville: string;
  codePostal: string;
  email: string;
  telephone: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Clients {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  dateNaissance: Date;
  adresse: string;
  ville: string;
  codePostal: string;
  password: string;
  createdAt: Date;
}


interface RendezVous {
  id: number;
  idDocteur: number;
  idClient: number;
  date: Date;
  heureDebut: Date;
  heureFin: Date;
  status: string;
  motif: string;
  createdAt: Date;
}


export {Docteur, Clients, RendezVous}
