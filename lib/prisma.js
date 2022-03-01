// Ce fichier permettra de faire une seule définition de l'objet "prisma" que l'on utilisera pour nos requêtes à la base de données.
import { PrismaClient } from '@prisma/client';


// Créer une instance de prisma qui va contenir notre objet PrismaClient qui nous permettra d'utiliser les méthodes du package.
let prisma;

// Lorsque Node va s'éxécuter on va regarder si on est en mode production ou si Node a déjà défini prisma dans l'application.
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;