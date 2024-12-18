interface User {
    id?: string;
    nom: string;
    prenom: string;
    email: string;
    role: string;
    telephone: string;
    password: string;
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
    idDocteur: number;
    idClient: number;
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

export {User, Docteur, Client, RendezVous, Specialite}
