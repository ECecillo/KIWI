// Configuration de la liaison entre Spotify, Youtube et NextAuth en utilisant les credentials dans le .env.
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GoogleProvider from "next-auth/providers/google";
import SpotifyProvider from "next-auth/providers/spotify";
import prisma from '../../../lib/prisma';
import { LOGIN_URL, refreshAccessTokenSpotify } from "../../../lib/spotify";
import { GOOGLE_AUTHORIZATION_URL, refreshAccessTokenGoogle } from '../../../lib/google';


async function checkTokenValidity(provider, token, expires_at) {
  try {

    // On prend la constante : 1647500000000 qui permettra de réduire assez notre expiration pour pouvoir le stocker dans la database.
    // On utilisera cette constante dans le cas où on sera amené à refraichir le token et à comprésser la valeur du temps d'expiration du prochaine token.
    const constante_reduit_Big_Int = 1647500000000;

    console.log("Valeur de Expire at ", expires_at)
    // Lorsque l'utilisateur s'authentifie pour la première fois, la valeur calculé est supérieur à 1.5 millions or ici si elle est inférieure c'est que l'on a déjà mis à jour le token et que l'on a stocké la valeur compréssée.
    if (expires_at < 1647000000) {
      expires_at += constante_reduit_Big_Int;
    }
    else 
      expires_at *= 1000;

    // On vérifie si le token est encore valide.
    if (Date.now() < expires_at) {
      console.log('EXISTING ACCESS TOKEN IS VALID');
      return {
        accessToken: token.access_token,
      };
    }

    // Si le token d'accès a expiré après 1 h.
    console.log('ACCESS TOKEN HAS EXPIRED, REFRESHING...');
    // fonction qui va rafraichir le token.
    let new_token;
    if (provider === "Google") {
      new_token = await refreshAccessTokenGoogle(token);
    }
    else if (provider === "Spotify") {
      new_token = await refreshAccessTokenSpotify(token);
    }

    if (!new_token)
      console.debug('ERROR NEW_TOKEN');


    // Le Int que l'on stockera dans la database.
    const database_token_expires_at = new_token.accessTokenExpires - constante_reduit_Big_Int;
    console.log("Valeur expires at ", database_token_expires_at)

    // Comme on a récupéré un nouvelle access, refresh et une expiration date, on doit mettre à jour la bdd avec ces nouvelles données.
    const updateToken = await prisma.account.update({
      where: {
        // On utilise l'ID que l'on a récup dans la requête dans la bdd avant.
        id: token.id,
      },
      data: { // On changera les colonnes suivantes.
        refresh_token: new_token.refreshToken,
        access_token: new_token.accessToken,
        expires_at: {
          set: database_token_expires_at,
        }
      }
    })
    console.log("Token successfully updated : ", updateToken);

    return new_token;
  }
  catch (error) {
    console.log(error);
    return {
      token,
      error
    };
  }
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization: LOGIN_URL, // LOGIN_URL : Spécifie toutes les permissions dont on aura besoin et les mets dans un URL.
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: GOOGLE_AUTHORIZATION_URL,
    })
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
  pages: {
    // Spécifie une page de login spéciale lorsque l'on utilisera le /api/auth/signIn .
    signIn: '/login',
  },
  session: {
    strategy: "database",
  },
  callbacks: {
    // https://next-auth.js.org/tutorials/refresh-token-rotation
    async session({ session, user }) {

      /* On va chercher les Tokens utilisateur qui sont dans la bdd. */
      const sessionToken = await prisma.user.findUnique({
        where: {
          id: user.id,
        },
        include: {
          accounts: true,
        },
      })

      // Destruction de l'objet accounts pour récupérer l'objet spotify et google (on check aussi si ils sont bien définies).
      const { [0]: spotify_tokens, [1]: google_tokens } = sessionToken.accounts;

      if (spotify_tokens) {
        // Si la variable est bien défini alors on définira l'access token de spotify.
        session.spotify = await checkTokenValidity("Spotify", spotify_tokens, spotify_tokens.expires_at);
      }
      else
        session.spotify = null;

      if (google_tokens) {
        // Si la variable est bien défini alors on définira l'access token de google.
        session.google = await checkTokenValidity("Google", google_tokens, google_tokens.expires_at);
      }
      else
        session.google = null;

      console.log("Session spotify : ",session)
      return session;
    },
  },
})