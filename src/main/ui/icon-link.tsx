import { IconType } from 'react-icons'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

type Props = {
  IconFill: IconType
  IconOut: IconType
  link: string
  label: string
}

export const IconLink: React.FC<Props> = ({ IconFill, IconOut, label, link }) => {
  const { pathname } = useRouter()

  const isLinked = pathname === link

  return (
    <li className={`${isLinked ? 'text-white' : 'text-zinc-400'} text-xl`}>
      <Link href={link} className="flex gap-2 items-center justify-center ">
        <div className="text-3xl">{isLinked ? <IconFill /> : <IconOut />}</div>
        <span className="hover:text-white capitalize">{label}</span>
      </Link>
    </li>
  )
}
