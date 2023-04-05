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
import { useGlobal, formatHelper, useSpotify } from '..'
import * as Progress from '@radix-ui/react-progress'
import { BiDevices } from 'react-icons/bi'
import Link from 'next/link'
import React from 'react'

export const Player = () => {
  const { playback, player, trackState } = useGlobal()
  const { spotifyApi } = useSpotify()
  const [progress, setProgress] = React.useState(0)
  const [duration, setDuration] = React.useState(0)
  const [percentage, setPercentage] = React.useState(0)

  React.useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      (async () => {
        try {
          setProgress(playback.progress_ms!)
          setDuration(trackState.duration_ms!)
          const percentage = await Math.floor((progress / duration) * 100)
          setPercentage(percentage)
        } catch (error) {
          console.error((error as any).message)
        }
      })()
    }
  }, [playback])

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
      <div className="flex flex-col gap-1 flex-grow items-center">
        <div className="flex items-center gap-6 justify-center">
          <SecondaryButton onClick={player.shuffle}>
            <FaRandom
              title="Aleatório"
              className={`${playback?.shuffle_state ? 'text-green-500' : ''}`}
            />
          </SecondaryButton>
          <SecondaryButton onClick={progress > 10000 ? player?.seek : player.previous}>
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
        <div className='flex gap-2 items-center justify-center'>
          <span className='text-xs'>{formatHelper.formatDuration(progress)}</span>
          <Progress.Root
            className='relative overflow-hidden bg-zinc-400 rounded-full w-80 h-1'
            value={percentage}
          >
            <Progress.Indicator
              className='bg-green-400 w-full h-full transition-transform'
              style={{ transform: `translateX(-${100 - percentage}%)` }}
            />
          </Progress.Root>
          <span className='text-xs'>{formatHelper.formatDuration(duration)}</span>
        </div>
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
