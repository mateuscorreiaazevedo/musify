import { HeaderBar, formatHelper, useGlobal } from '@/modules/core'
import { MusicSearchList } from '@/main/components'
import { useArtist } from '@/modules/artists'
import { CardAlbum } from '@/modules/albums'
import { ButtonPlay, Card } from '@/main/ui'
import { useRouter } from 'next/router'
import Head from 'next/head'
import React from 'react'

export default function Artist () {
  const { query } = useRouter()
  const { country, handlePlay } = useGlobal()
  const { artist, albums, loading, topTracks, relatedArtists } = useArtist(query.id as string, country)

  const followers = formatHelper.formatNumber(artist.followers?.total)

  async function handlePlayMainTracks (i = 0) {
    const uris = topTracks.slice(i).map(item => item.uri)
    await handlePlay(uris)
  }

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
        <title>{artist.name} • Musify</title>
      </Head>
      <div className="absolute inset-0 pl-64 h-2/3 bg-gradient-to-b from-[#BC1A38] to-transparent" />
      <HeaderBar color="#B91C37" asDuotone />
      <article className="container relative">
        <section className="mt-20 gap-4 flex justify-start items-end">
          {artist.images && (
            <img
              src={artist.images[0].url}
              alt={artist.name!}
              className="w-60 h-60 object-cover shadow-2xl rounded-full"
            />
          )}
          <div>
            <h1 className="text-5xl font-bold">{artist.name}</h1>
            <p className="w-full pr-44 pt-2 text-justify">{followers} seguidores</p>
          </div>
        </section>
        <ButtonPlay handlePlayLikedMusics={handlePlayMainTracks} label={artist.name} />
        <section className="w-full mt-28">
          <h2 className="text-2xl font-bold mb-4">Populares</h2>
          <ul className="w-full">
            {topTracks?.map((item, i: number) => (
              <MusicSearchList key={item.id} item={item} handlePlayed={() => handlePlayMainTracks(i)} />
            ))}
          </ul>
        </section>
        <section className="w-full mt-32">
          <h2 className="text-2xl font-bold mb-4">Discografia</h2>
          <ul className="grid grid-flow-col gap-5 mx-4 overflow-x-auto scrollbar-thin py-2">
            {albums.map(item => (
              <CardAlbum
                key={item.id}
                id={item.id}
                image={item.images[0]?.url}
                link={`/album/${item.id}`}
                name={item.name}
                type={item.type}
              />
            ))}
          </ul>
        </section>
        <section className="w-full mt-32 pb-32">
          <h2 className="text-2xl font-bold mb-4">Os fãs também curtem</h2>
          <ul className="grid grid-flow-col gap-5 mx-4 overflow-x-auto scrollbar-thin py-2">
            {relatedArtists.map(item => (
              <Card
                key={item.id}
                image={item.images[0]?.url}
                link={`/artist/${item.id}`}
                name={item.name}
                descriptionOrType={item.type}
              />
            ))}
          </ul>
        </section>
      </article>
    </>
  )
}
