import { useTracks } from '@/modules/collections'
import { HeaderBar, usePlayback } from '@/modules/core'
import { FaPlay } from 'react-icons/fa'
import Link from 'next/link'
import React from 'react'
import { useUserPlaylists } from '@/modules/playlists'
import { useInView } from 'react-intersection-observer'
import Head from 'next/head'

export default function Library () {
  const { playlists, refreshPlaylistsInView, getTrackMyPlaylist } = useUserPlaylists()
  const { likedTracks, totalTracks, loading } = useTracks()
  const { ref, inView, entry } = useInView()
  const { handlePlay } = usePlayback()

  async function handlePlayLikedMusics () {
    const uris = likedTracks.map(item => item.track.uri)
    await handlePlay(uris)
  }

  async function handlePlayliPlaylist (id: string) {
    const tracks = await getTrackMyPlaylist(id)
    const uris = tracks?.map(item => item.track?.uri)

    handlePlay(uris as string[])
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
            <div key={item.id} className="relative p-3 bg-zinc-800 hover:bg-zinc-700 transition-colors rounded-md h-64 group/item mx-4">
              <Link href={`/playlist/${item.id}`} className="flex flex-col gap-px">
                <img src={item.images[0].url} alt={item.name} className="h-40 object-contain" />
                <h2 className="text-xl font-bold truncate">{item.name}</h2>
                <p className="text-zinc-400 truncate">{item.description}</p>
                <p className="text-zinc-400 text-sm">De {item.owner.display_name}</p>
              </Link>
              <div
                onClick={() => handlePlayliPlaylist(item.id)}
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
