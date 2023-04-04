import { HeaderBar, useDebounce, useSpotify } from '@/modules/core'
import { MusicSearchList } from '@/main/components'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { Card } from '@/main/ui'
import Head from 'next/head'
import React from 'react'
import { CardPlaylist } from '@/modules/playlists'
import { CardAlbum } from '@/modules/albums'

export default function Search () {
  const [results, setResults] = React.useState({} as SpotifyApi.SearchResponse)
  const [loading, setLoading] = React.useState(false)
  const { spotifyApi } = useSpotify()
  const { query } = useRouter()
  const { debouncedValue } = useDebounce(query.q as string)

  React.useEffect(() => {
    if (debouncedValue?.length) {
      (async () => {
        setLoading(true)
        try {
          const tracks = await spotifyApi.searchTracks(debouncedValue, { limit: 4 })
          const response = await spotifyApi.search(debouncedValue, ['album', 'artist', 'playlist'])
          setResults({
            tracks: tracks.body.tracks,
            ...response.body
          })
        } catch (error) {
          toast.error((error as any).message)
        } finally {
          setLoading(false)
        }
      })()
    } else if (!debouncedValue?.length) {
      setResults({})
    }
  }, [debouncedValue])

  if (!debouncedValue?.length) {
    return (
      <>
        <Head>
          <title>Search • Musify</title>
        </Head>
        <h1 className="text-4xl mt-10 font-bold text-white">
          Buscar Música, Artista, Álbum, Playlist...
        </h1>
      </>
    )
  }

  if (loading) {
    return (
      <>
        <Head>
          <title>Search • Musify</title>
        </Head>
        <h1 className="text-4xl font-bold text-white">Aguarde...</h1>
      </>
    )
  }

  console.log(results.playlists?.items)

  return (
    <>
      <Head>
        <title>Search • Musify</title>
      </Head>
      <HeaderBar />
      <article className="flex flex-col gap-2 mb-28">
        <section className="w-full">
          <h2 className="text-2xl font-bold mb-4">Músicas</h2>
          <ul className="w-full">
            {results.tracks?.items.map(item => (
              <MusicSearchList key={item.id} {...item} />
            ))}
          </ul>
        </section>
        {/* Artists */}
        <section className="w-full mt-3">
          <h2 className="text-2xl font-bold mb-4">Artistas</h2>
          <ul className="grid grid-flow-col gap-5 mx-4 overflow-x-auto scrollbar-thin py-2">
            {results.artists?.items.map(item => (
              <Card
                key={item.id}
                descriptionOrType={item.type as string}
                image={item.images[0]?.url}
                link={`/artist/${item.id}`}
                name={item.name}
                isArtist
              />
            ))}
          </ul>
        </section>
        <section className="w-full mt-3">
          <h2 className="text-2xl font-bold mb-4">Álbuns</h2>
          <ul className="grid grid-flow-col gap-5 mx-4 overflow-x-auto scrollbar-thin py-2">
            {results.albums?.items.map(item => (
              <CardAlbum
                key={item.id}
                type={item.type!}
                image={item.images[0].url}
                link={`/album/${item.id}`}
                name={item.name}
                id={item.id}
              />
            ))}
          </ul>
        </section>
        <section className="w-full mt-3">
          <h2 className="text-2xl font-bold mb-4">Playlists</h2>
          <ul className="grid grid-flow-col gap-5 mx-4 overflow-x-auto scrollbar-thin py-2">
            {results.playlists?.items.map(item => (
              <CardPlaylist
                key={item.id}
                description={item.description as string}
                image={item.images[0].url}
                link={`/playlist/${item.id}`}
                name={item.name}
                id={item.id}
                displayName={item.owner.display_name}
              />
            ))}
          </ul>
        </section>
      </article>
    </>
  )
}
