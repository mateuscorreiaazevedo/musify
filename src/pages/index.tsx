import { useMyRecentlyTracks, useMyTopArtists, useFeaturedPlaylists, usePlaylistArtists } from '@/modules/user'
import { HeaderBar, greeting } from '@/modules/core'
import { CardPlaylist } from '@/modules/playlists'
import { CardArtist } from '@/modules/artists'
import React from 'react'
import { CardAlbum } from '@/modules/albums'

export default function Home () {
  const { thisIsPlaylists } = usePlaylistArtists()
  const { playlists } = useFeaturedPlaylists()
  const { topArtists } = useMyTopArtists()
  const { tracks } = useMyRecentlyTracks()

  return (
    <>
      <div className="absolute inset-0 pl-64 h-2/3 bg-gradient-to-b from-[#054858] to-transparent" />
      <article className="relative mb-24">
        <HeaderBar color="#03333F" />
        <h1 className="text-4xl font-bold">{greeting}</h1>
        <section className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Músicas tocadas recentemente</h2>
          <ul className="grid grid-flow-col gap-2 mx-4 2xl:gap-3 scrollbar-thin py-2">
            {tracks?.map(({ track }) => (
              <CardAlbum
                key={track.id}
                type={track.type}
                image={track.album.images[0]?.url}
                link={`/album/${track.album.id}`}
                name={track.name}
                id={track.album.id}
              />
            ))}
          </ul>
        </section>
        <section className="w-full mt-3">
          <h2 className="text-2xl font-bold mb-4">Top artistas</h2>
          <ul className="grid grid-flow-col gap-2 2xl:gap-3 mx-4 scrollbar-thin py-2">
            {topArtists?.map(item => (
              <CardArtist
                key={item.id}
                type={item.type!}
                image={item.images[0]?.url}
                link={`/artist/${item.id}`}
                name={item.name}
                id={item.id}
              />
            ))}
          </ul>
        </section>
        <section className="w-full mt-3">
          <h2 className="text-2xl font-bold mb-4">Feitos para você</h2>
          <ul className="grid grid-flow-col gap-2 mx-4 2xl:gap-3 scrollbar-thin py-2">
            {playlists.items?.map(item => (
              <CardPlaylist
                key={item.id}
                description={item.description!}
                image={item.images[0]?.url}
                link={`/playlist/${item.id}`}
                name={item.name}
                id={item.id}
                displayName={item.name}
              />
            ))}
          </ul>
        </section>
        <section className="w-full mt-3">
          <h2 className="text-2xl font-bold mb-4">O melhor de cada artista</h2>
          <ul className="grid grid-flow-col gap-2 2xl:gap-3 mx-4 py-2">
            {thisIsPlaylists?.map(item => (
              <CardPlaylist
                key={item.id}
                description={item.description!}
                image={item.images[0]?.url}
                link={`/playlist/${item.id}`}
                name={item.name}
                id={item.id}
                displayName={item.owner.display_name}
              />
            ))}
          </ul>
        </section>
      </article>
    </>
  )
}
