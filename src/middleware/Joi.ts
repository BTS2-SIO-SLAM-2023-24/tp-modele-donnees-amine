import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from 'express';
import { EmployeModel } from '../models/Employe';   
import Logging from '../library/Logging';

// Cette fonction middleware prend un schéma Joi en tant que paramètre
// et valide le corps de la requête HTTP en fonction de ce schéma.
// Si la validation réussit, elle passe au middleware suivant.
// Sinon, elle renvoie une réponse d'erreur 422 avec les détails de l'erreur de validation.

export const ValidateJoi = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Utilisation de Joi pour valider le corps de la requête par rapport au schéma donné
            await schema.validateAsync(req.body);

            // Si la validation réussit, passe au middleware suivant
            next();
        } catch (error) {
            // En cas d'erreur de validation, enregistre l'erreur et renvoie une réponse d'erreur 422
            Logging.error(error);

            return res.status(422).json({ error });
        }
    };
};

// Définition de schémas de validation pour les données d'employé
// Ces schémas sont utilisés dans le middleware ci-dessus pour valider les requêtes.

export const Schemas = {
    employe: {
        create: Joi.object<IEmploye>({
            // Schéma de création d'un employé
            nom: Joi.string().required(),
            prenom: Joi.string().required()
        }),
        update: Joi.object<IEmploye>({
            // Schéma de mise à jour d'un employé
            nom: Joi.string().required(),
            prenom: Joi.string().required()
        })
    }
};
