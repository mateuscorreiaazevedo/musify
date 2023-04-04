import React from 'react'
import { useSpotify } from '../hooks/use-spotify'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'
interface ContextProps {
  currentDevice: SpotifyApi.UserDevice
  playback: SpotifyApi.CurrentPlaybackResponse
  handlePlay: (trackUris: string[]) => Promise<void>
  handlePause: () => Promise<void>
  setCurrentDevice: React.Dispatch<React.SetStateAction<SpotifyApi.UserDevice>>
  handlePlayMusic: (arr: any[], i: number) => Promise<void>
}

const Context = React.createContext({} as ContextProps)

export const PlaybackProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentDevice, setCurrentDevice] = React.useState({} as SpotifyApi.UserDevice)
  const [playback, setPlayback] = React.useState({} as SpotifyApi.CurrentPlaybackResponse)
  const { data: session } = useSession()
  const { spotifyApi } = useSpotify()

  React.useEffect(() => {
    if (session) {
      const interval = setTimeout(async () => {
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
      toast.error(
        'Por favor, caso não possua dispositivo disponível, abra o site open.spotify.com para que o Spotify reconheça algum dispositivo como ativo'
      )
    }
  }

  async function handlePause () {
    try {
      await spotifyApi.pause()
    } catch (error) {
      toast.error(
        'Por favor, caso não possua dispositivo disponível, abra o site open.spotify.com para que o Spotify reconheça algum dispositivo como ativo'
      )
    }
  }

  async function handlePlayMusic (arr: any[], i: number) {
    const uris = arr.slice(i).map(item => item.uri)
    await handlePlay(uris)
  }

  return (
    <Context.Provider value={{ setCurrentDevice, currentDevice, playback, handlePlay, handlePause, handlePlayMusic }}>
      {children}
    </Context.Provider>
  )
}

export const usePlayback = () => {
  const context = React.useContext(Context)

  if (!context) throw new Error('Error on Playback provider')

  return { ...context }
}
