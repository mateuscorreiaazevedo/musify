import { useSpotify } from '@/modules/core'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export const useUserPlaylists = () => {
  const [playlists, setPlaylists] = useState<SpotifyApi.PlaylistObjectSimplified[]>([])
  const [loading, setLoading] = useState(true)
  const [offset, setOffset] = useState(0)
  const { data: session } = useSession()
  const { spotifyApi } = useSpotify()

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      (async () => {
        try {
          const response = await spotifyApi.getUserPlaylists({ limit: 25 })
          setPlaylists(response.body.items)
        } catch (error) {
          toast.error((error as any).message)
        } finally {
          setLoading(false)
        }
      })()
    }
  }, [session, spotifyApi])

  const refreshPlaylistsInView = async () => {
    if (!loading) {
      try {
        const response = await spotifyApi.getUserPlaylists({ offset: offset + 20 })
        setOffset(offset + 20)
        setPlaylists([...playlists, ...response.body.items])
      } catch (error) {
        toast.error((error as any).message)
      }
    }
  }

  return { playlists, refreshPlaylistsInView }
}
