interface User {
  id?: string;
  nom: string;
  prenom: string;
  email: string;
  role: string;
  telephone: string;
  password: string;
  dateNaissance: Date | null;
  adresse: string | null;
  ville: string | null;
  codePostal: string | null;
  createdAt: Date;
  updatedAt: Date;
  doctor?: Docteur | null;
}

interface Docteur extends User {
  id_utilisateur: string;
  specialites: number[];
  adresse: string;
  ville: string;
  codePostal: string;
}

interface Client extends User {
  id_utilisateur: string;
  dateNaissance: Date;
  adresse: string;
  ville: string;
  codePostal: string;
}

interface RendezVous {
  id?: string;
  idDocteur: string;
  idClient: string;
  date: Date;
  heureDebut: Date;
  heureFin: Date;
  status: string;
  motif: string;
  createdAt: Date;
}
interface Specialite {
  id?: string;
  nom: string;
  image: string;
}

interface RDVWithUser extends RendezVous {
  user: User;
}

export { User, Docteur, Client, RendezVous, Specialite, RDVWithUser };
