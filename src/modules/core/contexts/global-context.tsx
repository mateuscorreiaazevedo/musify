import { useSpotify } from '../hooks/use-spotify'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'
import React from 'react'

interface PlayerProps {
  play: () => Promise<void>
  pause: () => Promise<void>
  next: () => Promise<void>
  previous: () => Promise<void>
  shuffle: () => Promise<void>
  repeat: () => Promise<void>
}

interface ContextProps {
  currentDevice: SpotifyApi.UserDevice
  playback: SpotifyApi.CurrentPlaybackResponse
  handlePlay: (trackUris: string[]) => Promise<void>
  setCurrentDevice: React.Dispatch<React.SetStateAction<SpotifyApi.UserDevice>>
  handlePlayMusic: (arr: any[], i: number) => Promise<void>
  country: string
  player: PlayerProps
  trackState: SpotifyApi.TrackObjectFull
}

const Context = React.createContext({} as ContextProps)

export const PlaybackProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentDevice, setCurrentDevice] = React.useState({} as SpotifyApi.UserDevice)
  const [playback, setPlayback] = React.useState({} as SpotifyApi.CurrentPlaybackResponse)
  const [trackState, setTrackState] = React.useState({} as SpotifyApi.TrackObjectFull)
  const [country, setCountry] = React.useState('')
  const { data: session } = useSession()
  const { spotifyApi } = useSpotify()

  async function handlePlayback () {
    try {
      const response = await spotifyApi.getMyCurrentPlaybackState()
      setPlayback(response.body)
      setTrackState(response.body.item as SpotifyApi.TrackObjectFull)
    } catch (error) {
      console.error((error as any).message)
    }
  }

  async function getCountry () {
    const languageCode = navigator.language || [navigator.language]
    let countryCode

    if (languageCode.includes('-')) {
      countryCode = languageCode.toString().split('-')[1]
    } else {
      countryCode = languageCode.toString()
    }
    setCountry(countryCode?.toUpperCase())
  }

  React.useEffect(() => {
    if (session && spotifyApi.getAccessToken()) {
      getCountry()
      const interval = setInterval(async () => {
        try {
          const devices = await spotifyApi.getMyDevices()
          const current = devices.body.devices[0]
          handlePlayback()
          setCurrentDevice(current!)
        } catch (error) {
          console.error((error as any).message)
        }
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [session, spotifyApi])

  async function handlePlay (trackUris: string[]) {
    if (spotifyApi.getAccessToken()) {
      try {
        await spotifyApi.play({ uris: trackUris, device_id: currentDevice.id! })
      } catch (error) {
        toast.error(
          'Por favor, caso não possua dispositivo disponível, abra o site open.spotify.com para que o Spotify reconheça algum dispositivo como ativo'
        )
      }
    }
  }

  async function handleRepeat () {
    if (spotifyApi.getAccessToken()) {
      if (playback.repeat_state === 'off') {
        await spotifyApi.setRepeat('context')
      } else if (playback.repeat_state === 'context') {
        await spotifyApi.setRepeat('track')
      } else {
        await spotifyApi.setRepeat('off')
      }
    }
  }

  const player: PlayerProps = {
    play: async () => {
      spotifyApi.getAccessToken() && await spotifyApi.play({ device_id: currentDevice.id! })
    },
    pause: async () => {
      spotifyApi.getAccessToken() && await spotifyApi.pause()
    },
    next: async () => {
      spotifyApi.getAccessToken() && await spotifyApi.skipToNext()
    },
    previous: async () => {
      spotifyApi.getAccessToken() && await spotifyApi.skipToPrevious()
    },
    shuffle: async () => {
      spotifyApi.getAccessToken() && await spotifyApi.setShuffle(!playback.shuffle_state)
    },
    repeat: handleRepeat
  }

  async function handlePlayMusic (arr: any[], i: number) {
    const uris = arr.slice(i).map(item => item.uri)
    await handlePlay(uris)
  }

  return (
    <Context.Provider
      value={{
        trackState,
        setCurrentDevice,
        country,
        currentDevice,
        playback,
        handlePlay,
        handlePlayMusic,
        player
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useGlobal = () => {
  const context = React.useContext(Context)

  if (!context) throw new Error('Error on Playback provider')

  return { ...context }
}
