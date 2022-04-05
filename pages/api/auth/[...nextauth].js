// Configuration de la liaison entre Spotify, Youtube et NextAuth en utilisant les credentials dans le .env.
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GoogleProvider from "next-auth/providers/google";
import SpotifyProvider from "next-auth/providers/spotify";
import prisma from '../../../lib/prisma';
import { LOGIN_URL, refreshAccessTokenSpotify } from "../../../lib/spotify";
import { GOOGLE_AUTHORIZATION_URL, refreshAccessTokenGoogle } from '../../../lib/google';


/* 
  @token : object qui 
*/
async function setSessionProviderToken(token, provider) {
  let sessionToken;
  if (token) {
    // Si la variable est bien défini alors on définira l'access token de spotify.
    sessionToken = await checkTokenValidity(provider, token, token.expires_at);
  }
  else {
    sessionToken = null;
  }

  return sessionToken;
}

async function checkTokenValidity(provider, token, expires_at) {
  try {

    // On prend la constante : 1647500000000 qui permettra de réduire assez notre expiration pour pouvoir le stocker dans la database.
    // On utilisera cette constante dans le cas où on sera amené à refraichir le token et à comprésser la valeur du temps d'expiration du prochaine token.
    const constante_reduit_Big_Int = 1647500000000;

    //console.log("Valeur de Expire at ", expires_at);
    // Lorsque l'utilisateur s'authentifie pour la première fois, la valeur calculé est supérieur à 1.5 millions or ici si elle est inférieure c'est que l'on a déjà mis à jour le token et que l'on a stocké la valeur compréssée.
    if (expires_at < 1647000000) {
      expires_at += constante_reduit_Big_Int;
    }
    else {
      expires_at *= 1000;
    }

    // On vérifie si le token est encore valide.
    if (Date.now() < expires_at) {
      console.log('EXISTING ACCESS TOKEN of ' + provider + ' IS VALID');
      return {
        access_token: token.access_token,
        expires_at: expires_at,
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
    });
    console.log("Token successfully updated : ", updateToken);

    return {
      access_token: new_token.accessToken,
      expires_at: database_token_expires_at,
    };
  }
  catch (error) {
    console.log("Ereur durant le rafrachissement du token ", error);
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
    async session({ session, user }) {
      if (session.spotify && session.google) {
        console.log("On a déjà récupérer les tokens pour les deux providers ", session);
        // Si on a déjà une session d'ouverte et qu'on s'est co avec Google et Spotify alors on a pas besoin de faire un call à la database et on vérifie direct le token.
        session.spotify = await setSessionProviderToken(session.spotify, "Spotify");
        session.google = await setSessionProviderToken(session.google, "Google");
      }
      else {
        /* On va chercher les Tokens utilisateur qui sont dans la bdd. */
        // Destruction de l'objet retourné pour récupérer l'objet spotify et google.
        const { [0]: spotify_tokens, [1]: google_tokens } = await prisma.account.findMany({
          where: {
            userId: user.id,
          },
          select: {
            id: true,
            provider: true,
            refresh_token: true,
            access_token: true,
            expires_at: true,
          }
        });
        session.spotify = await setSessionProviderToken(spotify_tokens, "Spotify");
        session.google = await setSessionProviderToken(google_tokens, "Google");
      }
      session.user.userId = user.id;
      //console.log("Session User : ", session);
      return session;
    },
  },
});