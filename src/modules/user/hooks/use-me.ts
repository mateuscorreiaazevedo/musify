import { useSpotify } from '@/modules/core'
import { toast } from 'react-toastify'
import React from 'react'

export const useMe = () => {
  const [loading, setLoading] = React.useState(false)
  const [me, setMe] = React.useState({} as SpotifyApi.CurrentUsersProfileResponse)
  const { spotifyApi } = useSpotify()

  React.useEffect(() => {
    (async () => {
      setLoading(true)
      try {
        const response = await spotifyApi.getMe()
        setMe(response.body)
      } catch (error) {
        toast.error((error as any).message)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  return {
    loadMe: loading,
    me
  }
}
