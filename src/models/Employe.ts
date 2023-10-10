// models/Employe.js
// Importez les modules nécessaires
import e from 'express';
import mongoose, { Schema, Document } from 'mongoose';

// Schéma pour l'employé
const EmployeSchema = new Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
  
});

// Modèle Interface pour typer les documents Employe
export interface EmployeModel extends Document {
    nom: string;
    prenom: string;

}



export default mongoose.model<EmployeModel>('Employe', EmployeSchema);
