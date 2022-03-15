// Configuration de la liaison entre Spotify, Youtube et NextAuth en utilisant les credentials dans le .env.
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GoogleProvider from "next-auth/providers/google";
import SpotifyProvider from "next-auth/providers/spotify";
import prisma from '../../../lib/prisma';
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify";
import { GOOGLE_AUTHORIZATION_URL } from '../../../lib/google';

// https://next-auth.js.org/tutorials/refresh-token-rotation
async function refreshAccessToken(token) {
  try {
    console.log("refreshAccessToken Start");
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);
    // Destructure l'objet de la réponse:
    // http://michaelthelin.se/spotify-web-api-node/#refreshAccessToken
    const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
    // Demande un nouveau token (access_token, refreshed_token ...).

    return {
      ...token, // Le nouveau token.
      accessToken: refreshedToken.access_token,  // Récupère le nouvelle access token.
      // Calcule l'heure et la date à laquelle le prochain token expirera que l'on multiplie par 1000 pour avois un résultat sous la forme d'heure et pas de ms.
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
      // Remplace notre ancien refresh token si on en reçoit un sinon reprend l'ancien.
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    // Si on a un problème dans la demande d'un nouveau refresh token on donne l'erreur.
    console.error(error);
    return {
      ...token, // On retourne le token qui a produit l'erreur.
      error: 'RefreshAccessTokenError',
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
    /* async signIn({ user, account, profile, email, credentials }) {
      console.log("callbacks signIn user : ", user);
      console.log("callbacks signIn account : ", account);
      console.log("callbacks signIn profile : ", profile);
      console.log("callbacks signIn email : ", email);
      console.log("callbacks signIn credentials : ", credentials);

    }, */
    // https://next-auth.js.org/tutorials/refresh-token-rotation
    async session({ session, user }) {
      // On donne les infos côté client qui les stockera dans des cookiees HttpOnly.
      /* session.user.username = token.username;
      // L'user aura également l'accessToken et le refreshToken sur sa session (comme on utilise le système de rotation de Token qui se renouvelle toutes les heures on aura un nouveau refreshToken à chaque fois donc pas de faille de sécurité).
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
       */

      /* On va chercher les Tokens utilisateur qui sont dans la bdd. */
      
      const sessionToken = await prisma.user.findUnique({
        where: {
          id: user.id,
        },
        include: {
          accounts: true,
        },
      })
      let { [0]: spotify_tokens, [1]: google_tokens } = sessionToken.accounts;

      spotify_tokens
        ? // Si l'utilisateur se connecte avec son compte Spotify, on définit l'access et le refresh token dans la session.
        session.spotify = {
          accessToken: spotify_tokens.access_token,
          refreshToken: spotify_tokens.refresh_token,
        }
        : // Il ne s'est pas co avec un compte spotify ou ne s'est jamais co.
        session.spotify = null;

      google_tokens
        ? // On s'est connecté
        session.google = {
          accessToken: google_tokens.access_token,
          refreshToken: google_tokens.refresh_token,
        }
        : // Il ne s'est pas co avec son compte Google.
        session.google = null;

      //console.log("NextAuth Session : ", session);
      return session;
    },
  },
})