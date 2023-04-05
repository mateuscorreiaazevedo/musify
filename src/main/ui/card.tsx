import { useGlobal } from '@/modules/core'
import Link from 'next/link'
import React from 'react'
import { FaPlay } from 'react-icons/fa'

type Props = {
  image: string
  name: string
  descriptionOrType: string
  displayName?: string
  isArtist?: boolean
  link: string
  uri?: string[]
}

export const Card = (props: Props) => {
  const { descriptionOrType, displayName, image, link, name, uri, isArtist = false } = props
  const { handlePlay } = useGlobal()

  async function handlePlayed () {
    await handlePlay(uri!)
  }

  return (
    <div className="relative p-3 bg-zinc-800 w-52 hover:bg-zinc-700 transition-colors rounded-md h-64 group/item mx-4">
      <Link href={link} className="flex flex-col gap-px">
        <img src={image} alt={name} className={`mx-auto h-40 w-40 shadow-2xl ${isArtist ? 'rounded-full object-cover' : 'rounded-sm object-contain'}`} />
        <h2 className="text-xl font-bold truncate">{name}</h2>
        <p className="text-zinc-400 truncate">{descriptionOrType}</p>
        {displayName && <p className="text-zinc-400 text-sm">De {displayName}</p>}
      </Link>
      {!isArtist && (
        <div onClick={handlePlayed} className="cursor-pointer shadow-lg absolute z-0 bottom-0 opacity-0 right-5 h-16 w-16 rounded-full bg-green-500 flex items-center justify-center transition-all group-hover/item:bottom-5 group-hover/item:opacity-100">
          <FaPlay className="fill-black text-xl" />
        </div>
      )}
    </div>
  )
}
