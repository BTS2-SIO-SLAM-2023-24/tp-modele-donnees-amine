// Importez les modules nécessaires
import mongoose, { Schema, Document } from 'mongoose';

// Schéma pour l'employé
const EmployeSchema = new Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    dateNaissance: { type: Date, required: true } // Ajoutez un champ pour la date de naissance
});

// Modèle Interface pour typer les documents Employe
export interface EmployeModel extends Document {
    nom: string;
    prenom: string;
    dateNaissance: Date;
    calculerAge(): number; // Nouvelle méthode pour calculer l'âge
}

// Méthode pour calculer l'âge d'un employé
EmployeSchema.methods.calculerAge = function (): number {
    const aujourdHui = new Date();
    const dateNaissance = this.dateNaissance;
    const differenceAnnees = aujourdHui.getFullYear() - dateNaissance.getFullYear();

    // Vérifiez si l'anniversaire de l'employé n'a pas encore eu lieu cette année
    const anniversairePasse = aujourdHui.getMonth() > dateNaissance.getMonth() || (aujourdHui.getMonth() === dateNaissance.getMonth() && aujourdHui.getDate() >= dateNaissance.getDate());

    // Si l'anniversaire a déjà eu lieu cette année, l'âge est la différence d'années
    // Sinon, l'âge est la différence d'années moins 1
    return anniversairePasse ? differenceAnnees : differenceAnnees - 1;
};

// Modèle Employe
export default mongoose.model<EmployeModel>('Employe', EmployeSchema);
