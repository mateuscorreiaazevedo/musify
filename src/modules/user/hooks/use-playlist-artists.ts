import { useSpotify } from '@/modules/core'
import { signOut, useSession } from 'next-auth/react'
import React from 'react'

export const usePlaylistArtists = () => {
  const { data: session } = useSession()
  const { spotifyApi } = useSpotify()
  const [thisIsPlaylists, setThisIsPlaylists] = React.useState<
    SpotifyApi.PlaylistObjectSimplified[]
  >([])

  React.useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      (async () => {
        try {
          const topArtists = await spotifyApi.getMyTopArtists()
          topArtists.body.items.forEach(async ({ name }) => {
            const response = await spotifyApi.searchPlaylists(`This is: ${name} `)
            const playlist = response.body.playlists!.items[0]
            setThisIsPlaylists(prev => {
              const playlistArray = [...prev, playlist]
              const thisIsPlaylistsArray = playlistArray.filter((item, i) => playlistArray.indexOf(item) === i)

              return thisIsPlaylistsArray
            })
          })
        } catch (error) {
          console.error((error as any).message)
          signOut({ callbackUrl: '/login' })
        }
      })()
    }
  }, [session])

  return {
    thisIsPlaylists
  }
}
