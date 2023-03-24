import { formatHelper } from '@/modules/core'
import React from 'react'

type Props = {
  index: number
  image: string
  name: string
  artists: { name: string }[]
  albumName: string
  addedAt: string
  duration: number | string
}

export const TableIcon = (props: Props) => {
  const { addedAt, albumName, artists, duration, image, index, name } = props

  return (
    <tr className="group/item hover:bg-zinc-700 transition-colors">
      <td className="pl-4">{index + 1}</td>
      <td className="flex gap-2 py-2 text-zinc-300 hover:text-white cursor-pointer">
        <img src={image} alt={albumName} className="w-10 h-10" />
        <div>
          <h3>{name}</h3>
          <p className="text-zinc-500 text-sm truncate md:w-44 lg:w-60 xl:w-72 2xl:w-full">
            {artists.map(({ name }) => name).join(', ')}
          </p>
        </div>
      </td>
      <td>
        <p className="text-zinc-500 group-hover/item:text-zinc-200 truncate md:w-40 lg:w-56 xl:w-64 2xl:w-full">
          {albumName}
        </p>
      </td>
      <td>{formatHelper.formatDate(addedAt)}</td>
      <td>{formatHelper.formatDuration(duration)}</td>
    </tr>
  )
}
