import { IconLink } from '@/main/ui'
import { useUserPlaylists } from '@/modules/playlists'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useInView } from 'react-intersection-observer'
import { sidebarByUserLinks, sidebarMainLinks } from '..'

export const Sidebar = () => {
  const { ref, inView, entry } = useInView({ threshold: 0 })
  const { playlists, refreshPlaylistsInView } = useUserPlaylists()
  const { query } = useRouter()

  React.useEffect(() => {
    if (entry) {
      refreshPlaylistsInView()
    }
  }, [inView])

  return (
    <nav className="w-60 h-screen fixed z-30 top-0 left-0 bg-black pt-8">
      <div className="space-y-4 mx-4 h-full">
        <Link href='/'>
          <Image
            src="https://cdn.worldvectorlogo.com/logos/spotify-1.svg"
            alt="Spotify logo"
            width={100}
            height={100}
            className="mx-auto w-36"
          />
        </Link>
        <ul className="pb-3 flex flex-col justify-start items-start gap-2 border-b border-b-zinc-700">
          {sidebarMainLinks.map(item => (
            <IconLink
              key={item.link}
              IconFill={item.iconFill}
              IconOut={item.iconOut}
              label={item.label}
              link={item.link}
            />
          ))}
        </ul>
        <ul className="pb-3 flex flex-col justify-start items-start gap-2 border-b border-b-zinc-700">
          {sidebarByUserLinks.map(item => (
            <IconLink
              key={item.link}
              IconFill={item.iconFill}
              IconOut={item.iconOut}
              label={item.label}
              link={item.link}
            />
          ))}
        </ul>
        <ul className="h-[59vh] overflow-y-auto scrollbar-thin px-1 scrollbar-thumb-zinc-800">
          {playlists.map((item, i: React.Key) => (
            <li key={i} className="truncate my-0.5">
              <Link href={`/playlist/${item.id}`} className={` hover:text-white transition-colors ${query.id === item.id ? 'text-white' : 'text-zinc-400'}`}>
                {item.name}
              </Link>
            </li>
          ))}
          <div ref={ref} />
        </ul>
      </div>
    </nav>
  )
}
