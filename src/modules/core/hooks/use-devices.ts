import React from 'react'
import { useSpotify } from './use-spotify'
import { toast } from 'react-toastify'
import { useSession } from 'next-auth/react'

export const useDevices = () => {
  const [devices, setDevices] = React.useState<SpotifyApi.UserDevice[]>([])
  const { data: session } = useSession()
  const { spotifyApi } = useSpotify()

  React.useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      (async () => {
        try {
          const response = await spotifyApi.getMyDevices()
          setDevices(response.body.devices)
        } catch (error) {
          console.error((error as any).message)
          toast.error((error as any).message)
        }
      })()
    }
  }, [session])

  return {
    devices
  }
}
