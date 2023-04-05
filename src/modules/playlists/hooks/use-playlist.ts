import { useSpotify } from '@/modules/core'
import { useRouter } from 'next/router'
import React from 'react'

export const usePlaylist = () => {
  const [loading, setLoading] = React.useState(false)
  const [playlist, setPlaylist] = React.useState({} as SpotifyApi.SinglePlaylistResponse)
  const [tracks, setTracks] = React.useState<SpotifyApi.PlaylistTrackObject[]>([])
  const { query, push } = useRouter()
  const { spotifyApi } = useSpotify()

  React.useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      (async () => {
        setLoading(true)
        try {
          const { body } = await spotifyApi.getPlaylist(query.id as string)
          setPlaylist(body)
          setTracks(body.tracks.items)
        } catch (error) {
          push('/')
        } finally {
          setLoading(false)
        }
      })()
    }
  }, [query.id])

  async function handleMoreTracks () {
    if (spotifyApi.getAccessToken()) {
      try {
        const response = await spotifyApi.getPlaylistTracks(query.id as string, {
          offset: tracks.length
        })
        setTracks([...tracks, ...response.body.items])
      } catch (error) {
        push('/')
      }
    }
  }

  return {
    playlist,
    loading,
    tracks,
    handleMoreTracks
  }
}
