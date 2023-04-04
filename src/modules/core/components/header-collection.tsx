import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { navCollectionLinks as n } from '../constants'

export const HeaderCollection = () => {
  const { pathname } = useRouter()

  return (
    <nav className="ml-10 h-20 w-96 flex items-center font-bold">
      <ul className="relative z-30 flex items-center gap-4">
        {n.map(({ label, link }, i: number) => (
          <li key={i} className={`${pathname === link ? 'bg-zinc-600' : ''} px-4 py-2 rounded-md`}>
            <Link href={link}>{label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
