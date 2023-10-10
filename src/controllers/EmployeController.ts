import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Employe from '../models/Employe';

// Fonction pour créer un nouvel employé
const createEmploye = (req: Request, res: Response, next: NextFunction) => {
    const { nom, prenom } = req.body;

    // Création d'une nouvelle instance d'Employe avec les données fournies
    const employe = new Employe({
        _id: new mongoose.Types.ObjectId(),
        nom,
        prenom
    });

    return employe
        .save() // Sauvegarde de l'employé dans la base de données
        .then((employe) => res.status(201).json({ employe })) // Réponse avec le statut 201 (Créé) et les détails de l'employé créé
        .catch((error) => res.status(500).json({ error })); // Gestion des erreurs
};

// Fonction pour lire les détails d'un employé en fonction de son identifiant
const readEmploye = (req: Request, res: Response, next: NextFunction) => {
    const employeId = req.params.employeId; // Récupération de l'identifiant de l'employé depuis les paramètres de la requête

    return Employe.findById(employeId) // Recherche de l'employé correspondant dans la base de données
        .then((employe) => (employe ? res.status(200).json({ employe }) : res.status(404).json({ message: 'Employé non trouvé' }))) // Réponse avec les détails de l'employé ou un message d'erreur
        .catch((error) => res.status(500).json({ error })); // Gestion des erreurs
};

// Fonction pour récupérer la liste de tous les employés
const readAllEmploye = (req: Request, res: Response, next: NextFunction) => {
    return Employe.find() // Recherche de tous les employés dans la base de données
        .then((employes) => res.status(200).json({ employes })) // Réponse avec la liste des employés
        .catch((error) => res.status(500).json({ error })); // Gestion des erreurs
};

// Fonction pour mettre à jour les détails d'un employé
const updateEmploye = (req: Request, res: Response, next: NextFunction) => {
    const employeId = req.params.employeId; // Récupération de l'identifiant de l'employé depuis les paramètres de la requête

    return Employe.findById(employeId) // Recherche de l'employé correspondant dans la base de données
        .then((employe) => {
            if (employe) {
                employe.set(req.body); // Mise à jour des données de l'employé avec les données fournies dans la requête

                return employe
                    .save() // Sauvegarde de l'employé modifié dans la base de données
                    .then((employe) => res.status(201).json({ employe })) // Réponse avec les détails de l'employé mis à jour
                    .catch((error) => res.status(500).json({ error })); // Gestion des erreurs
            } else {
                return res.status(404).json({ message: 'Employé non trouvé' }); // Employé non trouvé
            }
        })
        .catch((error) => res.status(500).json({ error })); // Gestion des erreurs
};

// Fonction pour supprimer un employé
const deleteEmploye = (req: Request, res: Response, next: NextFunction) => {
    const employeId = req.params.employeId; // Récupération de l'identifiant de l'employé depuis les paramètres de la requête

    return Employe.findByIdAndDelete(employeId) // Recherche de l'employé correspondant dans la base de données et suppression
        .then((employe) => (employe ? res.status(201).json({ employe, message: 'Employé supprimé' }) : res.status(404).json({ message: 'Employé non trouvé' }))) // Réponse avec un message indiquant la suppression ou une erreur
        .catch((error) => res.status(500).json({ error })); // Gestion des erreurs
};

export default { createEmploye, readEmploye, readAllEmploye, updateEmploye, deleteEmploye };
