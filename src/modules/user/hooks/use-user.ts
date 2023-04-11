import { useSession } from 'next-auth/react'
import { useSpotify } from '@/modules/core'
import { toast } from 'react-toastify'
import React from 'react'

export const useUser = (userId: string) => {
  const [loading, setLoading] = React.useState(false)
  const [user, setUser] = React.useState({} as SpotifyApi.UserProfileResponse)
  const { data: session } = useSession()

  const { spotifyApi } = useSpotify()

  React.useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      (async () => {
        setLoading(true)
        try {
          const response = await spotifyApi.getUser(userId)
          setUser(response.body)
        } catch (error) {
          toast.error((error as any).message)
        } finally {
          setLoading(false)
        }
      })()
    }
  }, [session, userId])

  return {
    loadUser: loading,
    user
  }
}
