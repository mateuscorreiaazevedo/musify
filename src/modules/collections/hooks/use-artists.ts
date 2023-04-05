import { useSpotify } from '@/modules/core'
import React from 'react'
import { toast } from 'react-toastify'

export const useArtists = () => {
  const [artists, setArtists] = React.useState<SpotifyApi.ArtistObjectFull[]>([])
  const [totalArtists, setTotalArtists] = React.useState(0)
  const [loading, setLoading] = React.useState(false)
  const [after, setAfter] = React.useState('')
  const { spotifyApi } = useSpotify()

  React.useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      (async () => {
        setLoading(true)
        try {
          const response = await spotifyApi.getFollowedArtists()
          setAfter(response.body.artists.cursors.after)
          setArtists(response.body.artists.items)
          setTotalArtists(response.body.artists.total!)
        } catch (error) {
          console.error((error as any).message)
          toast.error((error as any).message)
        } finally {
          setLoading(false)
        }
      })()
    }
  }, [])

  async function handleMoreArtists () {
    if (!loading && artists.length < totalArtists && spotifyApi.getAccessToken()) {
      try {
        const response = await spotifyApi.getFollowedArtists({ after })
        setArtists([...artists, ...response.body.artists.items])
        setAfter(response.body.artists.cursors.after)
      } catch (error) {
        console.error((error as any).message)
        toast.error((error as any).message)
      }
    }
  }

  return {
    loading,
    artists,
    handleMoreArtists
  }
}
