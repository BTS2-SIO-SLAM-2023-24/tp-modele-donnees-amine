// Création de la route Employe
import express from "express";    
import EmployeController from "../controllers/EmployeController"; // Import du contrôleur EmployeController
import { Schemas, ValidateJoi } from '../middleware/Joi'; // Import du middleware Joi pour valider les données de la requête HTTP

const router = express.Router();

// Définition des routes pour les opérations CRUD sur les employés en utilisant les fonctions du contrôleur
router.post('/', EmployeController.createEmploye);
router.get('/', EmployeController.readAllEmploye);
router.get('/:employeId', EmployeController.readEmploye);
router.put('/:employeId', EmployeController.updateEmploye);
router.patch('/:employeId',  EmployeController.updateEmploye);
router.delete('/:employeId', EmployeController.deleteEmploye);
router.get('/:employeId/age', EmployeController.calculerAge);

export default router; // Export du routeur pour être utilisé dans l'application principale
