import { useSpotify } from '@/modules/core'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'

export const useAlbums = () => {
  const [albums, setAlbums] = React.useState<SpotifyApi.SavedAlbumObject[]>([])
  const [total, setTotal] = React.useState(0)
  const [loading, setLoading] = React.useState(false)
  const { spotifyApi } = useSpotify()
  const { data: session } = useSession()

  const { push } = useRouter()

  React.useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      (async () => {
        setLoading(true)
        try {
          const { body } = await spotifyApi.getMySavedAlbums()
          setTotal(body.total)
          setAlbums(body.items)
        } catch (error) {
          push('/')
        } finally {
          setLoading(false)
        }
      })()
    }
  }, [session])

  async function handleMoreAlbums () {
    if (!loading && albums.length < total && spotifyApi.getAccessToken()) {
      const { body } = await spotifyApi.getMySavedAlbums({ offset: albums?.length })

      setAlbums([...albums, ...body.items])
    }
  }

  return {
    albums,
    loading,
    handleMoreAlbums
  }
}
