import { useSpotify } from '../hooks/use-spotify'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'
import React from 'react'

interface ContextProps {
  playback: SpotifyApi.CurrentPlaybackResponse
  handlePlay: (trackUris: string[]) => Promise<void>
  handlePlayMusic: (arr: any[], i: number) => Promise<void>
  country: string
  trackState: SpotifyApi.TrackObjectFull
}

const Context = React.createContext({} as ContextProps)

export const PlaybackProvider = ({ children }: { children: React.ReactNode }) => {
  const [playback, setPlayback] = React.useState({} as SpotifyApi.CurrentPlaybackResponse)
  const [trackState, setTrackState] = React.useState({} as SpotifyApi.TrackObjectFull)
  const [country, setCountry] = React.useState('')
  const { data: session } = useSession()
  const { spotifyApi } = useSpotify()

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
          const response = await spotifyApi.getMyCurrentPlaybackState()
          setPlayback(response.body)
          setTrackState(response.body.item as SpotifyApi.TrackObjectFull)
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
        await spotifyApi.play({ uris: trackUris, device_id: playback.device.id! })
      } catch (error) {
        toast.error(
          'Por favor, caso não possua dispositivo disponível, abra o site open.spotify.com para que o Spotify reconheça algum dispositivo como ativo'
        )
      }
    }
  }

  async function handlePlayMusic (arr: any[], i: number) {
    const uris = arr.slice(i).map(item => item.uri)
    await handlePlay(uris)
  }

  return (
    <Context.Provider
      value={{
        trackState,
        country,
        playback,
        handlePlay,
        handlePlayMusic,
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
