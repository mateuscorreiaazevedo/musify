import { useSpotify } from '@/modules/core'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'

export const useTracks = () => {
  const [likedTracks, setLikedTracks] = React.useState<SpotifyApi.SavedTrackObject[]>([])
  const [totalTracks, setTotalTracks] = React.useState(0)
  const [loading, setLoading] = React.useState(false)
  const { data: session } = useSession()
  const { spotifyApi } = useSpotify()
  const { push } = useRouter()

  React.useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      (async () => {
        setLoading(true)
        try {
          const { body } = await spotifyApi.getMySavedTracks()
          setTotalTracks(body.total)
          setLikedTracks(body.items)
        } catch (error) {
          push('/')
        } finally {
          setLoading(false)
        }
      })()
    }
  }, [session])

  async function handleMoreTracks () {
    if (!loading && spotifyApi.getAccessToken()) {
      const { body } = await spotifyApi.getMySavedTracks({ offset: likedTracks?.length })
      setLikedTracks([...likedTracks, ...body.items])
    }
  }

  return {
    likedTracks,
    loading,
    totalTracks,
    handleMoreTracks
  }
}
