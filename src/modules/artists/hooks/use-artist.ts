import { useSession } from 'next-auth/react'
import { useGlobal, useSpotify } from '@/modules/core'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { useMe } from '@/modules/user'
import React from 'react'

export const useArtist = (id: string) => {
  const [relatedArtists, setRelatedArtists] = React.useState<SpotifyApi.ArtistObjectFull[]>([])
  const [albums, setAlbums] = React.useState<SpotifyApi.AlbumObjectSimplified[]>([])
  const [topTracks, setTopTracks] = React.useState<SpotifyApi.TrackObjectFull[]>([])
  const [artist, setArtist] = React.useState({} as SpotifyApi.SingleArtistResponse)
  const [playlists, setPlaylists] = React.useState<SpotifyApi.PlaylistObjectSimplified[]>([])
  const [loading, setLoading] = React.useState(false)
  const { data: session } = useSession()
  const { country } = useGlobal()
  const { me } = useMe()

  const { spotifyApi } = useSpotify()
  const { push } = useRouter()

  React.useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      (async () => {
        setLoading(true)
        try {
          const response = await spotifyApi.getArtist(id)
          const artistAlbums = await spotifyApi.getArtistAlbums(id)
          const tracks = await spotifyApi.getArtistTopTracks(id, country)
          const related = await spotifyApi.getArtistRelatedArtists(id)
          const playlists = await spotifyApi.searchPlaylists(`This is ${response.body.name}`, { limit: 3 })
          setArtist(response.body)
          setAlbums(artistAlbums.body.items)
          setTopTracks(tracks.body.tracks)
          setRelatedArtists(related.body.artists)
          setPlaylists(playlists.body.playlists!.items)
        } catch (error) {
          toast.error((error as any).message)
          push('/')
        } finally {
          setLoading(false)
        }
      })()
    }
  }, [id, spotifyApi, me, session])

  return {
    artist,
    loading,
    albums,
    topTracks,
    relatedArtists,
    playlists
  }
}
