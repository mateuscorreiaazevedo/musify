import { IconLink } from '@/main/ui'
import { useUserPlaylists } from '@/modules/playlists'
import Link from 'next/link'
import React from 'react'
import { useInView } from 'react-intersection-observer'
import { sidebarByUserLinks, sidebarMainLinks } from '..'

export const Sidebar = () => {
  const { ref, inView, entry } = useInView({ threshold: 0 })
  const { playlists, refreshPlaylistsInView } = useUserPlaylists()

  React.useEffect(() => {
    if (entry) {
      refreshPlaylistsInView()
    }
  }, [inView])

  return (
    <nav className="w-60 h-screen fixed top-0 left-0 bg-black pt-8">
      <div className="space-y-4 mx-4 h-full">
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
        <ul className="h-[65vh] overflow-y-auto scrollbar-thin px-1 scrollbar-thumb-zinc-800">
            {playlists.map(item => (
              <li key={item.id} className='truncate my-0.5'>
                <Link
                  href={`/playlist/${item.id}`}
                  className="text-zinc-400 hover:text-white transition-colors"
                >
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
