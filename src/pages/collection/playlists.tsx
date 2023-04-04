import { CardPlaylist, useUserPlaylists } from '@/modules/playlists'
import { HeaderBar, useGlobal } from '@/modules/core'
import { useInView } from 'react-intersection-observer'
import { useTracks } from '@/modules/collections'
import { FaPlay } from 'react-icons/fa'
import Link from 'next/link'
import Head from 'next/head'
import React from 'react'

export default function Library () {
  const { playlists, refreshPlaylistsInView } = useUserPlaylists()
  const { likedTracks, totalTracks, loading } = useTracks()
  const { ref, inView, entry } = useInView()
  const { handlePlay } = useGlobal()

  async function handlePlayLikedMusics () {
    const uris = likedTracks.map(item => item.track.uri)
    await handlePlay(uris)
  }

  React.useEffect(() => {
    if (entry) {
      refreshPlaylistsInView()
    }
  }, [inView])

  if (loading) return <Head><title>Musify</title></Head>

  return (
    <>
    <Head>
      <title>Playlists • Musify</title>
    </Head>
      <article className="mb-28">
        <HeaderBar />
        <h1 className="text-2xl font-bold">Playlists</h1>
        <section className="container grid md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 mt-4 gap-4">
          <div className="col-span-2 relative group/item h-64 p-3 rounded-md bg-gradient-to-br from-[#470EF5] to-[#8C8BE5]">
            <Link href="/collection/tracks">
              <div className="flex flex-col justify-between h-full">
                <div className="overflow-y-hidden">{likedTracks.map(item => item.track.name).join(' • ')}</div>
                <div>
                  <h2 className="text-3xl font-bold">Músicas Curtidas</h2>
                  <p>{totalTracks} Músicas curtidas</p>
                </div>
              </div>
            </Link>
            <div
              onClick={handlePlayLikedMusics}
              className="cursor-pointer shadow-lg absolute z-0 bottom-0 opacity-0 right-5 h-16 w-16 rounded-full bg-green-500 flex items-center justify-center transition-all group-hover/item:bottom-5 group-hover/item:opacity-100"
            >
              <FaPlay className="fill-black text-xl" />
            </div>
          </div>
          {playlists.map(item => (
            <CardPlaylist
              key={item.id}
              description={item.description!}
              id={item.id}
              image={item.images[0]?.url}
              link={`/playlist/${item.id}`}
              name={item.name}
              displayName={item.owner.display_name}
            />
          ))}
        </section>
        <div ref={ref} />
      </article>
    </>
  )
}
