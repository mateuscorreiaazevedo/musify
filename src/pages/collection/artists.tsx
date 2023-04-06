import { useInView } from 'react-intersection-observer'
import { useArtists } from '@/modules/collections'
import { CardArtist } from '@/modules/artists'
import { HeaderBar } from '@/modules/core'
import Head from 'next/head'
import React from 'react'

export default function Artists () {
  const { artists, loading, handleMoreArtists } = useArtists()
  const { ref, inView, entry } = useInView()

  React.useEffect(() => {
    if (entry) {
      handleMoreArtists()
    }
  }, [inView])

  if (loading) {
    return (
      <Head>
        <title>Musify</title>
      </Head>
    )
  }

  return (
    <>
      <Head>
        <title>Artistas • Musify</title>
      </Head>
      <article className="mb-28">
        <HeaderBar />
        <h1 className="text-2xl font-bold">Artistas</h1>
        <section className="container grid md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 mt-4 gap-4">
          {artists.map(item => (
            <CardArtist
            key={item.id}
            type={item.type!}
            image={item.images[0]?.url}
            link={`/artist/${item.id}`}
            name={item.name}
            id={item.id}
          />
          ))}
        </section>
        <div ref={ref} />
      </article>
    </>
  )
}
