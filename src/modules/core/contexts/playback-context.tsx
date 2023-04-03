import React from 'react'
import { useSpotify } from '../hooks/use-spotify'
import { signOut, useSession } from 'next-auth/react'
interface ContextProps {
  currentDevice: SpotifyApi.UserDevice
  playback: SpotifyApi.CurrentPlaybackResponse
  handlePlay: (trackUris: string[]) => Promise<void>
  handlePause: () => Promise<void>
  setCurrentDevice: React.Dispatch<React.SetStateAction<SpotifyApi.UserDevice>>
}

const Context = React.createContext({} as ContextProps)

export const PlaybackProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentDevice, setCurrentDevice] = React.useState({} as SpotifyApi.UserDevice)
  const [playback, setPlayback] = React.useState({} as SpotifyApi.CurrentPlaybackResponse)
  const { data: session } = useSession()
  const { spotifyApi } = useSpotify()

  React.useEffect(() => {
    if (session) {
      const interval = setInterval(async () => {
        try {
          const devices = await spotifyApi.getMyDevices()
          const current = devices.body.devices[0]
          setCurrentDevice(current!)
          const response = await spotifyApi.getMyCurrentPlaybackState()
          setPlayback(response.body)
        } catch (error) {
          console.error((error as any).message)
        }
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [session, spotifyApi])

  async function handlePlay (trackUris: string[]) {
    try {
      await spotifyApi.play({ uris: trackUris, device_id: currentDevice.id! })
    } catch (error) {
      // signOut({ callbackUrl: '/login' })
    }
  }

  async function handlePause () {
    try {
      await spotifyApi.pause()
    } catch (error) {
      signOut({ callbackUrl: '/login' })
    }
  }

  return <Context.Provider value={{ setCurrentDevice, currentDevice, playback, handlePlay, handlePause }}>{children}</Context.Provider>
}

export const usePlayback = () => {
  const context = React.useContext(Context)

  if (!context) throw new Error('Error on Playback provider')

  return { ...context }
}
