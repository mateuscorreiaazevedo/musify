import { usePlaylist } from '@/modules/playlists'
import { formatHelper, useGlobal } from '@/modules/core'
import { ButtonPlay, Table, TableItem } from '@/main/ui'
import Head from 'next/head'
import React from 'react'
import Link from 'next/link'

export default function Playlist () {
  const { handleMoreTracks, loading, playlist, tracks } = usePlaylist()
  const { handlePlay } = useGlobal()

  if (loading) return <Head><title>Musify</title></Head>

  async function handlePlayPlaylist () {
    const tracks = playlist.tracks.items.map(item => item.track?.uri)
    await handlePlay(tracks as string[])
  }

  async function handlePlayMusic (i: number) {
    const uris = playlist.tracks.items.slice(i).map(item => item.track?.uri)
    await handlePlay(uris as string[])
  }

  return (
    <>
      <div className="absolute inset-0 pl-64 h-2/3 bg-gradient-to-b from-[#1db954] to-transparent" />
      <Head>
        <title>Musify • {playlist.name}</title>
      </Head>
      <article className="relative">
        <section className="mt-20 gap-4 flex justify-start items-end">
          {playlist.images && <img src={playlist.images[0].url} alt={playlist.description!} className="w-44" />}
          <div>
            <h1 className="text-5xl font-bold">{playlist.name}</h1>
            <p className="w-full pr-44 text-justify">{playlist.description}</p>
            <div className="flex gap-1 mt-2">
              <Link href={`/user/${playlist.owner?.id}`} className="font-bold hover:underline">
                {playlist.owner?.display_name}
              </Link>
              <span>•</span>
              <p>{formatHelper.formatNumber(playlist.followers?.total)} curtidas </p>
              <span>•</span>
              <p>{playlist.tracks?.total} músicas</p>
            </div>
          </div>
        </section>
        <ButtonPlay
          handlePlayLikedMusics={handlePlayPlaylist}
          label={playlist.name}
        />
        <Table primaryColor="#157537" intercectionFuntion={handleMoreTracks}>
          {tracks?.map((item, index: number) => (
            <TableItem
              key={index}
              name={item.track?.name}
              addedAt={item.added_at}
              albumName={item.track?.album.name}
              index={index}
              artists={item.track?.artists}
              duration={item.track?.duration_ms}
              image={item.track?.album.images[0]?.url}
              handlePlay={() => handlePlayMusic(index)}
            />
          ))}
        </Table>
      </article>
    </>
  )
}
