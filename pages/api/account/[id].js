import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
    const userId = req.query.id;
    if (req.method === 'DELETE') // Vérifie si on a bien une requête de type DELETE
    {
        const user = await prisma.user.delete({
            where: {
                id: userId
            },
        });
        res.json(user); // Envoie le résultat de l'opération dans la bdd à l'utilisateur.
    }
    else if (req.method === 'PUT') // Vérifie si on a bien une requête de type UPDATE et applique opération prévue.
    {
        // On stock les données de la requête dans des constantes.
        const body = JSON.parse(req.body);
        const { newUserImage: new_image, newUserName: new_name } = body.data;

        // On doit checker ce qui a été transmis et faire l'update qui correspond sans écraser les données déjà dans la table.
        // Si on a un nouveau lien et pas un nouveau pseudo.
        if (new_image && !new_name) {
            const user = await prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    image: new_image,
                }
            });
            res.status(200).json(user); // Envoie le résultat de l'opération dans la bdd à l'utilisateur.
        }
        // Si on a pas une nouvelle image mais un nouveau pseudo.
        else if (!new_image && new_name) {
            const user = await prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    name: new_name,
                }
            });
            res.status(200).json(user); // Envoie le résultat de l'opération dans la bdd à l'utilisateur.
        }
        // Si on a une nouvelle image et un nouveau pseudo.
        else if (new_image && new_name) {
            const user = await prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    name: new_name,
                    image: new_image,
                }
            });
            res.status(200).json(user); // Envoie le résultat de l'opération dans la bdd à l'utilisateur.
        }
        // Si on a rien de tous ça on renvoie une erreur avec un code 400.
        else {
            res.status(400).json({ new_image, new_name });
        }
    }
    else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`,
        );
    }
}