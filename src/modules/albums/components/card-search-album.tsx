import { useSpotify } from '@/modules/core'
import { Card } from '@/main/ui'
import React from 'react'

type Props = {
  image: string
  name: string
  type: string
  link: string
  id: string
}

export const CardAlbum = (props: Props) => {
  const { type, id, image, link, name } = props
  const [uris, setUris] = React.useState<string[]>([])
  const { spotifyApi } = useSpotify()

  React.useEffect(() => {
    if (id) {
      (async () => {
        const response = await spotifyApi.getAlbum(id)
        const trackUris = response.body.tracks.items.map(item => item?.uri)
        setUris(trackUris as string[])
      })()
    }
  }, [id, spotifyApi])

  return <Card descriptionOrType={type} image={image} link={link} name={name} uri={uris} />
}
