import { ButtonPlay, Table, TableItem } from '@/main/ui'
import { useAlbum } from '@/modules/albums'
import { useGlobal } from '@/modules/core'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Album () {
  const { album, tracks, loading } = useAlbum()
  const { handlePlay } = useGlobal()

  async function handlePlayAlbum (array: SpotifyApi.TrackObjectSimplified[]) {
    const uris = array?.map(item => item.uri)
    await handlePlay(uris)
  }

  async function handlePlayMusic (index: number) {
    const uris = tracks.slice(index).map(item => item.uri)
    handlePlay(uris)
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
      <div className="absolute inset-0 pl-64 h-2/3 bg-gradient-to-b from-[#A23428] to-transparent" />
      <Head>
        <title>Musify • {album.name}</title>
      </Head>
      <article className="relative">
        <section className="mt-20 gap-4 flex justify-start items-end">
          {album.images && <Image width={176} height={176} src={album.images[0].url} alt={album.name!} className="w-44 shadow-lg" />}
          <div>
            <p className="w-full pr-44 text-justify font-bold capitalize">{album.type}</p>
            <h1 className="text-5xl font-bold">{album.name}</h1>
            <p className="w-full pr-44 text-justify">{album.genres}</p>
            <div className="flex gap-1 mt-2">
              {album.artists?.map(item => (
                <Link href={`/artist/${item.id}`} key={item.id} className="font-bold hover:underline">{item.name}</Link>
              ))}
              <span>•</span>
              <p>{album.tracks?.total} músicas</p>
            </div>
          </div>
        </section>
        <ButtonPlay handlePlayLikedMusics={() => handlePlayAlbum(album.tracks.items)} label={album.name} />
        <Table primaryColor="#A23428">
          {tracks?.map((item, index: number) => (
            <TableItem
              key={index}
              name={item?.name}
              albumName={album?.name}
              index={index}
              artists={item?.artists}
              duration={item?.duration_ms}
              image={album?.images[0]?.url}
              handlePlay={() => handlePlayMusic(index)}
            />
          ))}
        </Table>
      </article>
    </>
  )
}
