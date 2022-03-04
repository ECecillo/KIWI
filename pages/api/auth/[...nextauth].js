// Configuration de la liaison entre Spotify, Youtube et NextAuth en utilisant les credentials dans le .env.
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GoogleProvider from "next-auth/providers/google";
import SpotifyProvider from "next-auth/providers/spotify";
import prisma from '../../../lib/prisma';

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
})