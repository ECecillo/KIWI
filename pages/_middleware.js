import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";


export async function middleware(req) {
    // Pour avoir le token il faut lui passer la clé que l'on utilise pour crypter les données.
    const { pathname } = req.nextUrl;

    const session = await getSession({ req });

    console.log("Middleware Session : ", session);

    // Si on a bien été redirigé lors de la connexion ou que 1 des index contient les tokens utilisateur alors on redirige l'utilisateur vers la page Home. 
    if (pathname.includes('/api/auth') || session)
    {
        return NextResponse.next(); // Fais en sorte qu'il puisse aller vers la page principale.
    }

    // Si on ne s'est jamais co spotify et google seront forcément null et si la path est différent de login (essaie d'accéder à Home sans s'être connecté) on le redirige.
    if ((!session) && (pathname !== "/login")) {
        // Redirige l'utilisateur vers la page de connexion si il ne s'est jamais connecté.
        const url = req.nextUrl.clone();
        url.pathname = "/login";
        return NextResponse.redirect(url);
    }

}

