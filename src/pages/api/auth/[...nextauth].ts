import nextAuth, { CallbacksOptions, NextAuthOptions } from 'next-auth'
import Spotify from 'next-auth/providers/spotify'
import { scopes, spotifyApi } from '@/main/config/spotify'
import { ExtendedToken, TokenError } from '@/modules/core'

const refreshAccessToken = async (token: ExtendedToken): Promise<ExtendedToken> => {
  try {
    spotifyApi.setAccessToken(token.accessToken)
    spotifyApi.setRefreshToken(token.refreshToken)
    const { body: refreshedToken } = await spotifyApi.refreshAccessToken()

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      refreshToken: refreshedToken.refresh_token || token.refreshToken,
      expiresAt: Date.now() + refreshedToken.expires_in * 1000
    }
  } catch (error) {
    return {
      ...token,
      error: TokenError.RefreshAccessTokenError
    }
  }
}

const jwtCallback: CallbacksOptions['jwt'] = async ({ token, account, user }) => {
  let extendedToken: ExtendedToken

  if (account && user) {
    extendedToken = {
      ...token,
      user,
      accessToken: account.access_token!,
      refreshToken: account.refresh_token!,
      expiresAt: (account.expires_at as number) * 1000 // conterted to ms
    }
    console.log('id:', extendedToken.id)
    return extendedToken
  }

  if (Date.now() + 5000 < (token as ExtendedToken).expiresAt) {
    return token
  }

  return await refreshAccessToken(token as ExtendedToken)
}

const sessionCallback: CallbacksOptions['session'] = async ({ session, token }) => {
  session.accessToken = (token as ExtendedToken).accessToken
  session.error = (token as ExtendedToken).error

  return session
}

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
  },
  callbacks: {
    jwt: jwtCallback,
    session: sessionCallback
  }
}

export default nextAuth(authOptions)
