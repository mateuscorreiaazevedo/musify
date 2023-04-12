import { spotifyApi } from '@/main/config/spotify'
import { signIn, useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { ExtendedSession, TokenError } from '../types/token'

export const useSpotify = () => {
  const { data: session } = useSession()

  useEffect(() => {
    if (session) {
      if ((session as ExtendedSession)?.error === TokenError.RefreshAccessTokenError) {
        signIn()
      }

      spotifyApi.setAccessToken((session as ExtendedSession).accessToken!)
    }
  }, [session])

  return { spotifyApi }
}
