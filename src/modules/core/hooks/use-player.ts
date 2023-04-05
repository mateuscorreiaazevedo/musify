import { useGlobal } from '../contexts/global-context'
import { useSpotify } from './use-spotify'
import { toast } from 'react-toastify'

export const usePlayer = () => {
  const { spotifyApi } = useSpotify()
  const { playback } = useGlobal()

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
      if (spotifyApi.getAccessToken()) {
        try {
          await spotifyApi.play()
        } catch (error) {
          console.error((error as any).message)
          toast.error((error as any).message)
        }
      }
    },
    pause: async () => {
      if (spotifyApi.getAccessToken()) {
        try {
          await spotifyApi.pause()
        } catch (error) {
          console.error((error as any).message)
          toast.error((error as any).message)
        }
      }
    },
    next: async () => {
      if (spotifyApi.getAccessToken()) {
        try {
          await spotifyApi.skipToNext()
        } catch (error) {
          console.error((error as any).message)
          toast.error((error as any).message)
        }
      }
    },
    previous: async () => {
      if (spotifyApi.getAccessToken()) {
        try {
          await spotifyApi.skipToPrevious()
        } catch (error) {
          await spotifyApi.seek(0)
        }
      }
    },
    shuffle: async () => {
      if (spotifyApi.getAccessToken()) {
        try {
          await spotifyApi.setShuffle(!playback.shuffle_state)
        } catch (error) {
          console.error((error as any).message)
          toast.error((error as any).message)
        }
      }
    },
    repeat: handleRepeat,
    seek: async () => {
      if (spotifyApi.getAccessToken()) {
        try {
          await spotifyApi.seek(0)
        } catch (error) {
          console.error((error as any).message)
          toast.error((error as any).message)
        }
      }
    },
    volumeUp: async (percent: number) => {
      if (spotifyApi.getAccessToken()) {
        if (spotifyApi.getAccessToken()) {
          try {
            if (percent < 100) {
              await spotifyApi.setVolume(percent + 1)
            } else {
              await spotifyApi.setVolume(100)
            }
          } catch (error) {
            console.error((error as any).message)
            toast.error((error as any).message)
          }
        }
      }
    },
    volumeDown: async (percent: number) => {
      if (spotifyApi.getAccessToken()) {
        if (spotifyApi.getAccessToken()) {
          try {
            if (percent > 0) {
              await spotifyApi.setVolume(percent - 1)
            } else {
              await spotifyApi.setVolume(0)
            }
          } catch (error) {
            console.error((error as any).message)
            toast.error((error as any).message)
          }
        }
      }
    }
  }

  return {
    player
  }
}
