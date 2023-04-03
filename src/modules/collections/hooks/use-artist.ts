import { useSpotify } from '@/modules/core'
import { useRouter } from 'next/router'
import React from 'react'

export const useArtist = () => {
  const [loading, setLoading] = React.useState(false)
  const [artist, setArtist] = React.useState({} as SpotifyApi.SingleArtistResponse)
  const { spotifyApi } = useSpotify()
  const { push } = useRouter()

  async function getArtist (id: string) {
    setLoading(true)
    try {
      const { body } = await spotifyApi.getArtist(id)
      setArtist(body)
    } catch (error) {
      push('/')
    } finally {
      setLoading(false)
    }
  }

  return {
    artist,
    loading,
    getArtist
  }
}
