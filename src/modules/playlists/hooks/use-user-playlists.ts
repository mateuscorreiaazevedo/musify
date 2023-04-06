import { useSpotify } from '@/modules/core'
import { signOut, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

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
          signOut({ callbackUrl: '/login' })
        } finally {
          setLoading(false)
        }
      })()
    }
  }, [session])

  const refreshPlaylistsInView = async () => {
    if (!loading && spotifyApi.getAccessToken()) {
      try {
        const response = await spotifyApi.getUserPlaylists({ offset: offset + 25, limit: 25 })
        setPlaylists([...playlists, ...response.body.items])
        setOffset(offset + 25)
      } catch (error) {
        signOut({ callbackUrl: '/login' })
      }
    }
  }

  async function getTrackMyPlaylist (id: string) {
    try {
      const {
        body: { items }
      } = await spotifyApi.getPlaylistTracks(id)
      return items
    } catch (error) {}
  }

  return { playlists, refreshPlaylistsInView, getTrackMyPlaylist }
}
