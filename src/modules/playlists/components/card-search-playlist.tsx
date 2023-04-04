import { useSpotify } from '@/modules/core'
import { Card } from '@/main/ui'
import React from 'react'

type Props = {
  image: string
  name: string
  description: string
  displayName?: string
  link: string
  id: string
}

export const CardPlaylist = (props: Props) => {
  const { description, id, image, link, name, displayName } = props
  const [uris, setUris] = React.useState<string[]>([])
  const { spotifyApi } = useSpotify()

  React.useEffect(() => {
    if (id) {
      (async () => {
        const response = await spotifyApi.getPlaylistTracks(id)
        const trackUris = response.body.items.map(item => item.track?.uri)
        setUris(trackUris as string[])
      })()
    }
  }, [id, spotifyApi])

  return (
    <Card descriptionOrType={description} image={image} link={link} name={name} displayName={displayName} uri={uris} />
  )
}
