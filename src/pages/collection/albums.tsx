import { useInView } from 'react-intersection-observer'
import { useAlbums } from '@/modules/collections'
import { CardAlbum } from '@/modules/albums'
import { HeaderBar } from '@/modules/core'
import Head from 'next/head'
import React from 'react'

export default function Albums () {
  const { albums, handleMoreAlbums, loading } = useAlbums()
  const { ref, inView, entry } = useInView()

  React.useEffect(() => {
    if (entry) {
      handleMoreAlbums()
    }
  }, [inView])

  if (loading) return <Head><title>Musify</title></Head>

  return (
    <>
    <Head>
      <title>Artistas • Musify</title>
    </Head>
      <article className="mb-28">
        <HeaderBar />
        <h1 className="text-2xl font-bold">Álbuns</h1>
        <section className="container grid md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 mt-4 gap-4">
          {albums.map(({ album }) => (
            <CardAlbum
              id={album.id}
              key={album.id}
              image={album.images[0].url}
              link={`/album/${album.id}`}
              name={album.name}
              type={album.type}
            />
          ))}
        </section>
        <div ref={ref} />
      </article>
    </>
  )
}
