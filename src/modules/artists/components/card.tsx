import { useGlobal, useSpotify } from '@/modules/core'
import { useSession } from 'next-auth/react'
import { Card } from '@/main/ui'
import React from 'react'

type Props = {
  image: string
  name: string
  type: string
  link: string
  id: string
}

export const CardArtist = (props: Props) => {
  const { type, id, image, link, name } = props
  const [uris, setUris] = React.useState<string[]>([])
  const { country } = useGlobal()
  const { data: session } = useSession()
  const { spotifyApi } = useSpotify()

  React.useEffect(() => {
    if (id) {
      (async () => {
        const response = await spotifyApi.getArtistTopTracks(id, country)
        const trackUris = response.body.tracks.map(item => item?.uri)
        setUris(trackUris as string[])
      })()
    }
  }, [id, spotifyApi, session])

  return (
    <Card
      descriptionOrType={type}
      image={image}
      link={link}
      name={name}
      uri={uris}
      isArtist
    />
  )
}
