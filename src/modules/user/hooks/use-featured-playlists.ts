import { useSession } from 'next-auth/react'
import { useSpotify } from '@/modules/core'
import { toast } from 'react-toastify'
import React from 'react'

export const useFeaturedPlaylists = () => {
  const { data: session } = useSession()
  const { spotifyApi } = useSpotify()
  const [playlists, setPlaylists] = React.useState(
    {} as SpotifyApi.PagingObject<SpotifyApi.PlaylistObjectSimplified>
  )

  React.useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      const handleFeaturedPlaylists = async () => {
        try {
          const response = await spotifyApi.getFeaturedPlaylists()
          setPlaylists(response.body.playlists)
        } catch (error) {
          console.error((error as any).message)
          toast.error((error as any).message)
        }
      }

      handleFeaturedPlaylists()
    }
  }, [session])

  return { playlists }
}
