import { useSpotify } from '@/modules/core'
import { useSession } from 'next-auth/react'
import { FaHeart } from 'react-icons/fa'
import Head from 'next/head'
import React from 'react'
import Link from 'next/link'

export default function Tracks () {
  const [likedTracks, setLikedTracks] = React.useState({} as SpotifyApi.UsersSavedTracksResponse)
  const [loading, setLoading] = React.useState(false)
  const { data: session } = useSession()
  const { spotifyApi } = useSpotify()

  React.useEffect(() => {
    (async () => {
      setLoading(true)
      try {
        const { body } = await spotifyApi.getMySavedTracks()
        setLikedTracks(body)
      } catch (error) {
        console.log((error as any).message)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  if (loading) {
    return <></>
  }

  return (
    <div>
      <div className="absolute inset-0 pl-64 h-1/2 bg-gradient-to-b from-[#412F80] to-transparent" />
      <Head>
        <title>Músicas Curtidas • Musify</title>
      </Head>
      <article className="relative">
        <section className="mt-20 gap-4 flex justify-start items-end">
          <span className="p-16 bg-gradient-to-br from-[#4622B3] to-[#798D89]">
            <FaHeart className="text-6xl" />
          </span>
          <div>
            <h1 className="text-5xl font-bold">Músicas Curtidas</h1>
            <div className="flex gap-1 mt-2">
              <Link href='/user/me' className="hover:underline">
                <p className="font-bold">{session?.user?.name}</p>
              </Link>
              <span>•</span>
              <p>{likedTracks.total} músicas</p>
            </div>
          </div>
        </section>
        <section></section>
      </article>
    </div>
  )
}
