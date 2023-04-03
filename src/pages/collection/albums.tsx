import { useInView } from 'react-intersection-observer'
import { HeaderBar, usePlayback } from '@/modules/core'
import { useAlbums } from '@/modules/collections'
import { FaPlay } from 'react-icons/fa'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

export default function Albums () {
  const { albums, handleMoreAlbums, loading } = useAlbums()
  const { ref, inView, entry } = useInView()
  const { handlePlay } = usePlayback()

  React.useEffect(() => {
    if (entry) {
      handleMoreAlbums()
    }
  }, [inView])

  async function handlePlayAlbum (tracks: SpotifyApi.TrackObjectSimplified[]) {
    const uris = tracks.map(item => item.uri)
    await handlePlay(uris)
  }

  if (loading) return <Head><title>Musify</title></Head>

  return (
    <>
    <Head>
      <title>Artistas • Musify</title>
    </Head>
      <article className="mb-28">
        <HeaderBar />
        <h1 className="text-2xl font-bold">Artistas</h1>
        <section className="container grid md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 mt-4 gap-4">
          {albums.map(({ album }) => (
            <div key={album.id} className="relative p-3 bg-zinc-800 hover:bg-zinc-700 transition-colors rounded-md h-64 group/item mx-4">
            <Link href={`/playlist/${album.id}`} className="flex flex-col gap-px">
              <img src={album.images[0].url} alt={album.name} className="h-40 object-contain" />
              <h2 className="text-xl font-bold truncate">{album.name}</h2>
              <p className="text-zinc-400 text-sm">{album.type}</p>
            </Link>
            <div
              onClick={() => handlePlayAlbum(album.tracks.items)}
              className="cursor-pointer shadow-lg absolute z-0 bottom-0 opacity-0 right-5 h-16 w-16 rounded-full bg-green-500 flex items-center justify-center transition-all group-hover/item:bottom-5 group-hover/item:opacity-100"
            >
              <FaPlay className="fill-black text-xl" />
            </div>
          </div>
          ))}
        </section>
        <div ref={ref} />
      </article>
    </>
  )
}
