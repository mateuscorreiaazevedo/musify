import { useSession } from 'next-auth/react'
import { useSpotify } from '@/modules/core'
import { toast } from 'react-toastify'
import React from 'react'

export const useMyTopArtists = () => {
  const { data: session } = useSession()
  const { spotifyApi } = useSpotify()
  const [topArtists, setTopArtists] = React.useState<SpotifyApi.ArtistObjectFull[]>([])

  React.useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      const getTopArtists = async () => {
        try {
          const response = await spotifyApi.getMyTopArtists()
          setTopArtists(response.body.items)
        } catch (error) {
          console.error((error as any).message)
          toast.error((error as any).message)
        }
      }

      getTopArtists()
    }
  }, [session])

  return { topArtists }
}
