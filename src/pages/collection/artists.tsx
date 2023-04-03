import { useInView } from 'react-intersection-observer'
import { useArtists } from '@/modules/collections'
import { HeaderBar } from '@/modules/core'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

export default function Artists () {
  const { artists, loading, handleMoreArtists } = useArtists()
  const { ref, inView, entry } = useInView()

  React.useEffect(() => {
    if (entry) {
      handleMoreArtists()
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
        <h1 className="text-2xl font-bold">Artistas</h1>
        <section className="container grid md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 mt-4 gap-4">
          {artists.map(item => (
            <div key={item.id} className="relative p-3 bg-zinc-800 hover:bg-zinc-700 transition-colors rounded-md h-64 group/item mx-4">
              <Link href={`/artist/${item.id}`} className="flex flex-col gap-px">
                <img src={item.images[0].url} alt={item.name} className="h-40 w-40 rounded-full shadow-2xl" />
                <h2 className="text-xl font-bold truncate">{item.name}</h2>
                <p className="text-zinc-400 text-sm font-semibold">{item.type}</p>
              </Link>
            </div>
          ))}
        </section>
        <div ref={ref} />
      </article>
    </>
  )
}
