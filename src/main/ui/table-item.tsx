import { formatHelper } from '@/modules/core'
import { FaPlay } from 'react-icons/fa'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

type Props = {
  index: number
  image?: string
  name?: string
  artists?: { name: string; id: string }[]
  albumName?: string
  addedAt?: string
  duration?: number | string
  handlePlay: () => void
}

export const TableItem = (props: Props) => {
  const { addedAt, albumName, artists, duration, image, index, name, handlePlay } = props

  function handlePlayed () {
    handlePlay()
  }

  return (
    <tr className="group/item hover:bg-zinc-700 transition-colors">
      <td className="pl-4">{index + 1}</td>
      <td className="flex gap-2 py-2 text-zinc-300 hover:text-white cursor-pointer">
        <div className="relative">
          <Image loading='lazy' width={200} height={200} src={image!} alt={albumName!} className="w-10 h-10 object-contain" />
          <div className="hidden cursor-pointer transition-all absolute inset-0 w-10 h-10 group-hover/item:flex items-center justify-center bg-zinc-800/90">
            <FaPlay className="fill-zinc-100" onClick={handlePlayed} />
          </div>
        </div>
        <div>
          <h3 className="truncate w-72">{name}</h3>
          <p className="text-zinc-500 text-sm truncate md:w-44 lg:w-60 xl:w-72 2xl:w-full">
            {artists?.map(({ name, id }) => (
              <Link key={id} href={`/artist/${id}`} className='hover:underline pr-1'>
                {name}
              </Link>
            ))}
          </p>
        </div>
      </td>
      <td>
        <p className="text-zinc-500 group-hover/item:text-zinc-200 truncate md:w-40 lg:w-56 xl:w-64 2xl:w-full">
          {albumName}
        </p>
      </td>
      <td>{formatHelper.formatDate(addedAt!)}</td>
      <td>{formatHelper.formatDuration(duration!)}</td>
    </tr>
  )
}
