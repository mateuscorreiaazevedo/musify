import { useSession } from 'next-auth/react'
import { useSpotify } from '@/modules/core'
import { toast } from 'react-toastify'
import React from 'react'

export const useMyRecentlyTracks = () => {
  const { data: session } = useSession()
  const { spotifyApi } = useSpotify()
  const [tracks, setTracks] = React.useState<SpotifyApi.PlayHistoryObject[]>([])

  React.useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      const getRecentlyTracks = async () => {
        try {
          const response = await spotifyApi.getMyRecentlyPlayedTracks()
          setTracks(response.body.items)
        } catch (error) {
          console.error((error as any).message)
          toast.error((error as any).message)
        }
      }

      getRecentlyTracks()
    }
  }, [session])

  return { tracks }
}
