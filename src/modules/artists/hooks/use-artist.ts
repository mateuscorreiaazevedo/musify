import { useSpotify } from '@/modules/core'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import React from 'react'

export const useArtist = (id: string, country?: string) => {
  const [relatedArtists, setRelatedArtists] = React.useState<SpotifyApi.ArtistObjectFull[]>([])
  const [albums, setAlbums] = React.useState<SpotifyApi.AlbumObjectSimplified[]>([])
  const [topTracks, setTopTracks] = React.useState<SpotifyApi.TrackObjectFull[]>([])
  const [artist, setArtist] = React.useState({} as SpotifyApi.SingleArtistResponse)
  const [loading, setLoading] = React.useState(false)
  const { spotifyApi } = useSpotify()
  const { push } = useRouter()

  React.useEffect(() => {
    (async () => {
      setLoading(true)
      try {
        const response = await spotifyApi.getArtist(id)
        const artistAlbums = await spotifyApi.getArtistAlbums(id)
        const tracks = await spotifyApi.getArtistTopTracks(id, country!)
        const related = await spotifyApi.getArtistRelatedArtists(id)
        setArtist(response.body)
        setAlbums(artistAlbums.body.items)
        setTopTracks(tracks.body.tracks)
        setRelatedArtists(related.body.artists)
      } catch (error) {
        toast.error((error as any).message)
        push('/')
      } finally {
        setLoading(false)
      }
    })()
  }, [id, spotifyApi, country])

  return {
    artist,
    loading,
    albums,
    topTracks,
    relatedArtists
  }
}
