import { useSpotify } from '@/modules/core'
import { useRouter } from 'next/router'
import React from 'react'

export const useAlbum = () => {
  const [loading, setLoading] = React.useState(false)
  const [album, setAlbum] = React.useState({} as SpotifyApi.SingleAlbumResponse)
  const [tracks, setTracks] = React.useState<SpotifyApi.TrackObjectSimplified[]>([])
  const { query, push } = useRouter()
  const { spotifyApi } = useSpotify()

  React.useEffect(() => {
    (async () => {
      setLoading(true)
      try {
        const { body } = await spotifyApi.getAlbum(query.id as string)
        setAlbum(body)
        setTracks(body.tracks.items)
      } catch (error) {
        push('/')
      } finally {
        setLoading(false)
      }
    })()
  }, [query.id])

  return {
    album,
    loading,
    tracks,
  }
}
