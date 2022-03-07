import { getToken } from "next-auth/jwt"; // Va chercher le contenu du JWT.
import { NextResponse } from "next/server";

export async function middleware(req) {
    
    const token = await getToken({req, secret: process.env.SECRET}); 
    // Pour avoir le token il faut lui passer la clé que l'on utilise pour crypter les données.

    const {pathname} = req.nextUrl;

    // Si le token exist on autorise l'utilisateur à passer.
    if(pathname.includes('/api/auth') || token) // Si on veut se login ou on est déjà connecté.
    {
        return NextResponse.next(); // Fais en sorte qu'il puisse aller vers la page principale.
    }

    if(!token && pathname !== "/login") { 
        // Redirige l'utilisateur vers la page de connexion si il ne s'est jamais connecté.
        const url = req.nextUrl.clone();
        url.pathname = "/login";
        return NextResponse.redirect(url);
    }
    
}