import { useTracks } from '@/modules/collections'
import { useSession } from 'next-auth/react'
import { Table, TableIcon } from '@/main/ui'
import { FaHeart } from 'react-icons/fa'
import Link from 'next/link'
import Head from 'next/head'
import React from 'react'

export default function Tracks () {
  const { handleMoreTracks, likedTracks, loading, totalTracks } = useTracks()
  const { data: session } = useSession()

  if (loading) return <></>

  return (
    <div>
      <Head>
        <title>Músicas Curtidas • Musify</title>
      </Head>
      <div className="absolute inset-0 pl-64 h-2/3 bg-gradient-to-b from-[#412F80] to-transparent" />
      <article className="relative">
        <section className="mt-20 gap-4 flex justify-start items-end">
          <span className="p-16 bg-gradient-to-br shadow-lg from-[#4622B3] to-[#798D89]">
            <FaHeart className="text-6xl" />
          </span>
          <div>
            <h1 className="text-5xl font-bold">Músicas Curtidas</h1>
            <div className="flex gap-1 mt-2">
              <Link href="/user/me" className="hover:underline">
                <p className="font-bold">{session?.user?.name}</p>
              </Link>
              <span>•</span>
              <p>{totalTracks} músicas</p>
            </div>
          </div>
        </section>
        <Table intercectionFuntion={handleMoreTracks} primaryColor='#402E7D'>
          {likedTracks.map((item, index: number) => (
            <TableIcon
              key={index}
              addedAt={item.added_at}
              albumName={item.track.album.name}
              image={item.track.album.images[0].url}
              name={item.track.name}
              artists={item.track.artists}
              duration={item.track.duration_ms}
              index={index}
            />
          ))}
        </Table>
      </article>
    </div>
  )
}
