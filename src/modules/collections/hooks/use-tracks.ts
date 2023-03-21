import { useSpotify } from '@/modules/core'
import { useSession } from 'next-auth/react'
import React from 'react'
import { toast } from 'react-toastify'

export const useTracks = () => {
  const [likedTracks, setLikedTracks] = React.useState<SpotifyApi.SavedTrackObject[]>([])
  const [totalTracks, setTotalTracks] = React.useState(0)
  const [loading, setLoading] = React.useState(false)
  const [offset, setOffset] = React.useState(20)
  const { data: session } = useSession()
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
  }, [spotifyApi, session])

  async function handleMoreTracks () {
    if (!loading) {
      try {
        const { body } = await spotifyApi.getMySavedTracks({ offset })
        setLikedTracks([...likedTracks, ...body.items])
        setOffset(offset + 20)
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
