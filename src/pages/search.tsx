import { HeaderBar, useSpotify } from '@/modules/core'
import { FaPlay } from 'react-icons/fa'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { ItemList } from '@/main/ui'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

export default function Search () {
  const [results, setResults] = React.useState({} as SpotifyApi.SearchResponse)
  const [loading, setLoading] = React.useState(false)
  const {
    query: { q }
  } = useRouter()
  const { spotifyApi } = useSpotify()

  React.useEffect(() => {
    if (q?.length) {
      (async () => {
        setLoading(true)
        try {
          const tracks = await spotifyApi.searchTracks(q as string, { limit: 4 })
          const response = await spotifyApi.search(q as string, ['album', 'artist', 'playlist'])
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
    } else if (!q?.length) {
      setResults({})
    }
  }, [q])

  if (!q?.length) {
    return (
      <>
        <Head>
          <title>Search • Musify</title>
        </Head>
        <h1 className="text-4xl mt-10 font-bold text-white">Buscar Música, Artista, Álbum, Playlist...</h1>
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
              <ItemList key={item.id} {...item} />
            ))}
          </ul>
        </section>
        <section className="w-full mt-3">
          <h2 className="text-2xl font-bold mb-4">Artistas</h2>
          <ul className="grid grid-flow-col gap-5 mx-4 overflow-x-auto scrollbar-thin py-2">
            {results.artists?.items.map(item => (
              <div
                key={item.id}
                className="relative p-3 bg-zinc-800 w-52 hover:bg-zinc-700 transition-colors rounded-md h-64 group/item mx-4"
              >
                <Link href={`/album/${item.id}`} className="flex flex-col gap-px">
                  <img
                    src={item.images[0]?.url}
                    alt={item.name}
                    className="h-40 w-40 mx-auto object-contain rounded-full"
                  />
                  <h2 className="text-xl font-bold truncate">{item.name}</h2>
                  <p className="text-zinc-400 text-sm">{item.type}</p>
                </Link>
              </div>
            ))}
          </ul>
        </section>
        <section className="w-full mt-3">
          <h2 className="text-2xl font-bold mb-4">Álbuns</h2>
          <ul className="grid grid-flow-col gap-5 mx-4 overflow-x-auto scrollbar-thin py-2">
            {results.albums?.items.map(item => (
              <div
                key={item.id}
                className="relative p-3 bg-zinc-800 w-52 hover:bg-zinc-700 transition-colors rounded-md h-64 group/item mx-4"
              >
                <Link href={`/album/${item.id}`} className="flex flex-col gap-px">
                  <img src={item.images[0].url} alt={item.name} className="h-40 object-contain" />
                  <h2 className="text-xl font-bold truncate">{item.name}</h2>
                  <p className="text-zinc-400 text-sm">{item.type}</p>
                </Link>
                <div className="cursor-pointer shadow-lg absolute z-0 bottom-0 opacity-0 right-5 h-16 w-16 rounded-full bg-green-500 flex items-center justify-center transition-all group-hover/item:bottom-5 group-hover/item:opacity-100">
                  <FaPlay className="fill-black text-xl" />
                </div>
              </div>
            ))}
          </ul>
        </section>
        <section className="w-full mt-3">
          <h2 className="text-2xl font-bold mb-4">Playlists</h2>
          <ul className="grid grid-flow-col gap-5 mx-4 overflow-x-auto scrollbar-thin py-2">
            {results.playlists?.items.map(item => (
              <div
                key={item.id}
                className="relative p-3 bg-zinc-800 w-52 hover:bg-zinc-700 transition-colors rounded-md h-64 group/item mx-4"
              >
                <Link href={`/playlist/${item.id}`} className="flex flex-col gap-px">
                  <img src={item.images[0].url} alt={item.name} className="h-40 object-contain" />
                  <h2 className="text-xl font-bold truncate">{item.name}</h2>
                  <p className="text-zinc-400 truncate">{item.description}</p>
                  <p className="text-zinc-400 text-sm">De {item.owner.display_name}</p>
                </Link>
                <div className="cursor-pointer shadow-lg absolute z-0 bottom-0 opacity-0 right-5 h-16 w-16 rounded-full bg-green-500 flex items-center justify-center transition-all group-hover/item:bottom-5 group-hover/item:opacity-100">
                  <FaPlay className="fill-black text-xl" />
                </div>
              </div>
            ))}
          </ul>
        </section>
      </article>
    </>
  )
}
