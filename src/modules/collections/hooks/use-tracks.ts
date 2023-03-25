import { useSpotify } from '@/modules/core'
import { toast } from 'react-toastify'
import React from 'react'

export const useTracks = () => {
  const [likedTracks, setLikedTracks] = React.useState<SpotifyApi.SavedTrackObject[]>([])
  const [totalTracks, setTotalTracks] = React.useState(0)
  const [loading, setLoading] = React.useState(false)
  const { spotifyApi } = useSpotify()

  React.useEffect(() => {
    (async () => {
      setLoading(true)
      try {
        const { body } = await spotifyApi.getMySavedTracks()
        setTotalTracks(body.total)
        setLikedTracks(body.items)
      } catch (error) {
        toast.error((error as any).message)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  async function handleMoreTracks () {
    if (!loading) {
      try {
        const { body } = await spotifyApi.getMySavedTracks({ offset: likedTracks?.length })
        setLikedTracks([...likedTracks, ...body.items])
      } catch (error) {
        toast.error((error as any).message)
      }
    }
  }

  return {
    likedTracks,
    loading,
    totalTracks,
    handleMoreTracks
  }
}
