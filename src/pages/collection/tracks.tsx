import { useInView } from 'react-intersection-observer'
import { MdOutlineWatchLater } from 'react-icons/md'
import { useTracks } from '@/modules/collections'
import { formatHelper } from '@/modules/core'
import { useSession } from 'next-auth/react'
import { FaHeart } from 'react-icons/fa'
import Link from 'next/link'
import Head from 'next/head'
import React from 'react'

import { useScroll, useTransform, motion } from 'framer-motion'

export default function Tracks () {
  const { handleMoreTracks, likedTracks, loading, totalTracks } = useTracks()
  const { data: session } = useSession()
  const { ref, inView } = useInView()
  const { scrollY } = useScroll()
  const background = useTransform(
    scrollY,
    [0, 450, 700],
    ['transparent', 'transparent', '#222222']
  )
  const borderColor = useTransform(
    scrollY,
    [0, 450, 700],
    ['transparent', 'transparent', '#434343']
  )

  React.useEffect(() => {
    if (inView) {
      handleMoreTracks()
    }
  }, [inView])

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
        <section className="mt-48 mb-24">
          <motion.div
            transition={{ duration: 1.5 }}
            style={{ background, borderBottomColor: borderColor }}
            className='fixed left-60 top-20 w-full h-10 border-b'
          />
          <table className="w-full font-semibold text-zinc-500">
            <thead
              className="sticky top-20 border-b border-b-zinc-700 h-10 text-zinc-300 pl-2"
            >
              <tr>
                <td className='pl-4'>#</td>
                <td>Título</td>
                <td>Álbum</td>
                <td>Adicionada em</td>
                <td>
                  <MdOutlineWatchLater className="pl-2 text-3xl" />
                </td>
              </tr>
            </thead>
            <tbody>
              {likedTracks.map((item, i: number) => (
                <tr key={i} className='group/item hover:bg-zinc-700 transition-colors'>
                  <td className="pl-4">{i + 1}</td>
                  <td className="flex gap-2 py-2 text-zinc-300 hover:text-white cursor-pointer">
                    <img src={item.track.album?.images[0].url} alt={item.track.album.name} className="w-10 h-10" />
                    <div>
                      <h3>{item.track.name}</h3>
                      <p className="text-zinc-500 text-sm truncate md:w-44 lg:w-60 xl:w-72 2xl:w-full">
                        {item.track.artists.map(({ name }) => name).join(', ')}
                      </p>
                    </div>
                  </td>
                  <td>
                    <p className="text-zinc-500 group-hover/item:text-zinc-200 truncate md:w-40 lg:w-56 xl:w-64 2xl:w-full">{item.track.album.name}</p>
                  </td>
                  <td>{formatHelper.formatDate(item.added_at)}</td>
                  <td>{formatHelper.formatDuration(item.track.duration_ms)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div ref={ref} />
        </section>
      </article>
    </div>
  )
}
