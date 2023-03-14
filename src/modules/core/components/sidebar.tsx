import { IconLink } from '@/main/ui'
import React from 'react'
import { sidebarByUserLinks, sidebarMainLinks } from '..'

export const Sidebar = () => {
  return (
    <nav className="w-60 h-screen fixed top-0 left-0 bg-black pt-8">
      <div className='space-y-4'>
        <ul className="py-2 flex flex-col justify-start items-start mx-4 gap-2 border-b border-b-zinc-700">
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
        <ul className="py-2 flex flex-col justify-start items-start mx-4 gap-2 border-b border-b-zinc-700">
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
      </div>
    </nav>
  )
}
