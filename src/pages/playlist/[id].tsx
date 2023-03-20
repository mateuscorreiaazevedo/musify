import { useSpotify } from '@/modules/core'
import { useRouter } from 'next/router'
import Head from 'next/head'
import React from 'react'
import Link from 'next/link'

export default function Playlist () {
  const [playlist, setPlaylist] = React.useState({} as SpotifyApi.SinglePlaylistResponse)
  const [loading, setLoading] = React.useState(false)
  const { spotifyApi } = useSpotify()
  const { query, push } = useRouter()

  const formatedNumber = Intl.NumberFormat('pt-BR').format(playlist.followers?.total)

  React.useEffect(() => {
    (async () => {
      setLoading(true)
      try {
        const { body } = await spotifyApi.getPlaylist(query.id as string)
        setPlaylist(body)
      } catch (error) {
        push('/')
      } finally {
        setLoading(false)
      }
    })()
  }, [query.id])

  console.log(playlist)

  if (loading) {
    return <></>
  }

  return (
    <>
      <div className="absolute inset-0 pl-64 h-1/2 bg-gradient-to-b from-[#1db954] to-transparent" />
      <Head>
        <title>{playlist.name} • Musify</title>
      </Head>
      <article className="relative">
        <section className="mt-20 gap-4 flex justify-start items-end">
          {playlist.images && <img src={playlist.images[0].url} alt={playlist.description!} className="w-44" />}
          <div>
            <h1 className="text-5xl font-bold">{playlist.name}</h1>
            <p className='w-full pr-44 text-justify'>{playlist.description}</p>
            <div className='flex gap-1 mt-2'>
              <Link href={`/user/${playlist.owner?.id}`} className='font-bold hover:underline'>{playlist.owner?.display_name}</Link>
              <span>•</span>
              <p>{formatedNumber} curtidas </p>
              <span>•</span>
              <p>{playlist.tracks?.total} músicas</p>
            </div>
          </div>
        </section>
        <section>
        </section>
      </article>
    </>
  )
}
