// Configuration de la liaison entre Spotify, Youtube et NextAuth en utilisant les credentials dans le .env.
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GoogleProvider from "next-auth/providers/google";
import SpotifyProvider from "next-auth/providers/spotify";
import prisma from '../../../lib/prisma';
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify";

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
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET
    })
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET, 
  pages: {
    // Spécifie une page de login spéciale lorsque l'on utilisera le /api/auth/signIn .
    signIn: '/login',
  },
 /* 
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      // Pas besoin.
      if (account && user) {
        return {
          accessToken: account.access_token,
          accessTokenExpires: Date.now() + account.expires_in * 1000,
          refreshToken: account.refresh_token,
          user,
        }
      }
      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        return token
      }
    }
  }, */
})