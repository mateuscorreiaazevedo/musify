import nextAuth, { NextAuthOptions } from 'next-auth'
import Spotify from 'next-auth/providers/spotify'
import { scopes } from '@/main/config/spotify'

export const authOptions: NextAuthOptions = {
  providers: [
    Spotify({
      clientId: process.env.SPOTIFY_ID!,
      clientSecret: process.env.SPOTIFY_SECRET!,
      authorization: {
        url: 'https://accounts.spotify.com/authorize',
        params: {
          scope: scopes
        }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/login'
  }

}

export default nextAuth(authOptions)
