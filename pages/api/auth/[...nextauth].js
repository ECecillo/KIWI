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
    strategy: "jwt",
  },
  callbacks: {
    // https://next-auth.js.org/tutorials/refresh-token-rotation
    async jwt({ token, account, user }) {
      // Si on s'est bien connecté on devrait avoir une variable user, account
      // si c'est la première fois que l'on se connecte alors :
      // On retourne le token suivant.
      if (account && user) {
        // Ce que prisma remplis automatiquement lorsque l'on se connecte.
        return {
          // Retourne le Token JWT.
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          // On convertit le temps que Spotify nous donne (en ms) en heure.
          accessTokenExpires: account.expires_at * 1000,
          // Permettra de savoir quand on enverra une nouvelle requête à spotify pour avoir un nouveau access token voir un refresh token.
          username: account.providerAccoundId,
          status: "logged",
        };
      }

      // C'est là que l'on regarde si on aura besoin de renvoyer une nouvelle requête.
      // Ici le token est encore valide donc on le retourne.
      if (Date.now() < token.accessTokenExpires) {
        console.log('EXISTING ACCESS TOKEN IS VALID');
        return token;
      }
      // Si le token d'accès a expiré après 1 h.
      console.log('ACCESS TOKEN HAS EXPIRED, REFRESHING...');
      // fonction qui va rafraichir le token.
      return await refreshAccessToken(token);
    },
    async session({ session, token }) {
      // On donne les infos côté client qui les stockera dans des cookiees HttpOnly.
      session.user.username = token.username;
      // L'user aura également l'accessToken et le refreshToken sur sa session (comme on utilise le système de rotation de Token qui se renouvelle toutes les heures on aura un nouveau refreshToken à chaque fois donc pas de faille de sécurité).
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.status = token.status;

      return session;
    },
  },
})