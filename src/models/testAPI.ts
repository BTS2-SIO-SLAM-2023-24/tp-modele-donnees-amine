import Employe, { EmployeModel } from './Employe';

// Créez une fonction asynchrone pour tester l'API
async function testAPI() {
    try {
        // Créez un employé avec une date de naissance
        const employe: EmployeModel = new Employe({
            nom: 'John',
            prenom: 'Doe',
            dateNaissance: new Date('1990-05-15') // Date de naissance de l'employé
        });

        // Enregistrez l'employé dans la base de données (si vous utilisez MongoDB)
        // await employe.save();

        // Utilisez la méthode pour calculer l'âge
        const age: number = employe.calculerAge();
        console.log(`L'âge de l'employé est ${age} ans.`);
    } catch (error) {
        console.error('Une erreur est survenue :', error);
    }
}

// Appelez la fonction de test
testAPI();
