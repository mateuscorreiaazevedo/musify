import {
  FaPause,
  FaPlay,
  FaRandom,
  FaReply,
  FaReplyAll,
  FaStepBackward,
  FaStepForward
} from 'react-icons/fa'
import { PrimaryButton, SecondaryButton } from '@/main/ui'
import { useGlobal } from '../contexts/global-context'
import { BiDevices } from 'react-icons/bi'
import Link from 'next/link'
import React from 'react'

export const Player = () => {
  const { playback, player, trackState } = useGlobal()

  return (
    <footer className="flex px-10 items-center justify-between fixed z-50 bottom-0 p-2 border-t border-t-zinc-700 w-full bg-zinc-800 h-[8vh]">
      <div className="flex gap-2 w-40">
        {trackState && (
          <>
            <img src={trackState?.album?.images[0]?.url} className="w-14 h-14 object-contain" />
            <div className="mt-1">
              <h4 className="whitespace-nowrap font-semibold hover:underline">
                <Link href={`/album/${trackState.album?.id}`}>{trackState?.name}</Link>
              </h4>
              <span className="text-sm truncate flex gap-1">
                {trackState?.album?.artists?.map(item => (
                  <Link
                    href={`/artist/${item.id}`}
                    key={item.id}
                    className="text-zinc-400 hover:underline"
                  >
                    {item.name}
                  </Link>
                ))}
              </span>
            </div>
          </>
        )}
      </div>
      <div className="flex items-center gap-6 text-xl flex-grow justify-center">
        <SecondaryButton onClick={player.shuffle}>
          <FaRandom
            title="Aleatório"
            className={`${playback?.shuffle_state ? 'text-green-500' : ''}`}
          />
        </SecondaryButton>
        <SecondaryButton onClick={player.previous}>
          <FaStepBackward title="Voltar" />
        </SecondaryButton>
        <PrimaryButton onClick={!playback?.is_playing ? player.play : player.pause}>
          {!playback?.is_playing
            ? (
            <FaPlay title="Play" className="ml-1" />
              )
            : (
            <FaPause title="Pausar" />
              )}
        </PrimaryButton>
        <SecondaryButton onClick={player.next}>
          <FaStepForward title="Avançar" />
        </SecondaryButton>
        <RepeatComponent />
      </div>
      <div>
        <BiDevices />
      </div>
    </footer>
  )
}

function RepeatComponent () {
  const { playback, player } = useGlobal()

  if (playback?.repeat_state === 'context') {
    return (
      <SecondaryButton onClick={player.repeat}>
        <FaReplyAll title="Repetir uma faixa" className="text-green-500" />
      </SecondaryButton>
    )
  }

  if (playback?.repeat_state === 'track') {
    return (
      <SecondaryButton onClick={player.repeat}>
        <FaReply title="Não repetir" className="text-green-500" />
      </SecondaryButton>
    )
  }

  return (
    <SecondaryButton onClick={player.repeat}>
      <FaReplyAll title="Repetir" />
    </SecondaryButton>
  )
}
