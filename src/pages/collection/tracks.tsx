import { useTracks } from '@/modules/collections'
import { ButtonPlay, Table, TableItem } from '@/main/ui'
import { FaHeart } from 'react-icons/fa'
import { useMe } from '@/modules/user'
import Link from 'next/link'
import Head from 'next/head'
import React from 'react'
import { useGlobal } from '@/modules/core'
import Image from 'next/image'

export default function Tracks () {
  const { handleMoreTracks, likedTracks, loading, totalTracks } = useTracks()
  const { handlePlay } = useGlobal()
  const { me } = useMe()

  if (loading) {
    return (
      <Head>
        <title>Músicas Curtidas • Musify</title>
      </Head>
    )
  }

  async function handlePlayLikedMusics () {
    const uris = likedTracks.map(item => item.track.uri)
    await handlePlay(uris)
  }

  async function handlePlayMusic (i: number) {
    const uris = likedTracks.slice(i).map(item => item.track.uri)
    await handlePlay(uris)
  }

  return (
    <div>
      <Head>
        <title>Músicas Curtidas • Musify</title>
      </Head>
      <div className="absolute inset-0 pl-64 h-2/3 bg-gradient-to-b from-[#412F80] to-transparent" />
      <article className="relative">
        <section className="mt-20 gap-4 flex justify-start items-end">
          <span className="p-16 bg-gradient-to-br rounded-md shadow-lg from-[#4622B3] to-[#798D89]">
            <FaHeart className="text-6xl" />
          </span>
          <div>
            <h1 className="text-5xl font-bold">Músicas Curtidas</h1>
            <div className="flex gap-1 items-center mt-2">
              {me.images && (
                <Image
                  width={200}
                  height={200}
                  loading='lazy'
                  src={me.images[0].url}
                  alt={me.display_name!}
                  className="w-7 h-7 rounded-full object-cover"
                />
              )}
              <Link href={`/user/${me.id}`} className="hover:underline">
                <p className="font-bold">{me.display_name}</p>
              </Link>
              <span>•</span>
              <p>{totalTracks} músicas</p>
            </div>
          </div>
        </section>
        <ButtonPlay handlePlayLikedMusics={handlePlayLikedMusics} label="Músicas Curtidas" />
        <Table intercectionFuntion={handleMoreTracks} primaryColor="#402E7D">
          {likedTracks.map((item, index: number) => (
            <TableItem
              key={index}
              addedAt={item.added_at}
              albumName={item.track.album.name}
              image={item.track.album.images[0].url}
              name={item.track.name}
              artists={item.track.artists}
              duration={item.track.duration_ms}
              index={index}
              handlePlay={() => handlePlayMusic(index)}
            />
          ))}
        </Table>
      </article>
    </div>
  )
}
