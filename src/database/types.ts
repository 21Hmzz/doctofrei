interface User {
    id?: number;
    nom: string;
    prenom: string;
    email: string;
    role: string;
    telephone: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

interface Docteur extends User {
    specialites: number[];
    adresse: string;
    ville: string;
    codePostal: string;
}

interface Client extends User {
    dateNaissance: Date;
    adresse: string;
    ville: string;
    codePostal: string;
}

interface RendezVous {
    id?: number;
    idDocteur: number;
    idClient: number;
    date: Date;
    heureDebut: Date;
    heureFin: Date;
    status: string;
    motif: string;
    createdAt: Date;
}

export {User, Docteur, Client, RendezVous}
