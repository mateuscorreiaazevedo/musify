import { formatHelper, useGlobal } from '@/modules/core'
import { FaPlay } from 'react-icons/fa'
import { toast } from 'react-toastify'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

type Props = {
  item: SpotifyApi.TrackObjectFull
  onSearchPage?: boolean
  uris?: string[]
  handlePlayed?: () => Promise<void>
}

export const MusicSearchList = ({ item, onSearchPage = false, handlePlayed }: Props) => {
  const { handlePlay } = useGlobal()

  async function handlePlayedMusic (trackUri: string[]) {
    if (onSearchPage) {
      try {
        await handlePlay(trackUri)
      } catch (error) {
        toast.error((error as any).message)
      }
    } else {
      try {
        await handlePlayed!()
      } catch (error) {
        toast.error((error as any).message)
      }
    }
  }

  return (
    <li className="w-full cursor-default flex gap-2 items-center rounded text-zinc-400 hover:bg-zinc-700 px-4 py-1 group/track">
      <div className="relative">
        <Image width={200} height={200} loading='lazy' src={item?.album?.images[0]?.url} alt={item.album.name} className="w-10 h-10" />
        <div className="hidden cursor-pointer transition-all absolute inset-0 w-10 h-10 group-hover/track:flex items-center justify-center bg-zinc-800/50">
          <FaPlay className="fill-zinc-100" onClick={() => handlePlayedMusic([item.uri])} />
        </div>
      </div>
      <div className="group/track-item flex flex-col">
        <h3 className="text-white">{item.name}</h3>
        <p className="truncate md:w-60 lg:w-96 xl:w-96 2xl:w-full flex gap-1">
          {item.artists.map(({ id, name }) => (
            <span key={id}>
              <Link href={`/artist/${id}`} className="hover:underline group-hover/track:text-zinc-200">
                {name}
              </Link>
            </span>
          ))}
        </p>
      </div>
      <div className="flex-grow flex justify-end gap-10">{formatHelper.formatDuration(item.duration_ms)}</div>
    </li>
  )
}
