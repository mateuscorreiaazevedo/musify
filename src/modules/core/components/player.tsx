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
import Link from 'next/link'
import React from 'react'

import * as Slider from '@radix-ui/react-slider'
import { DevicesPopover } from './devices-popover'
import Image from 'next/image'

export const Player = () => {
  const [percentage, setPercentage] = React.useState(0)
  const [progress, setProgress] = React.useState(0)
  const [duration, setDuration] = React.useState(0)
  const { playback, trackState } = useGlobal()
  const { spotifyApi } = useSpotify()

  React.useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      (async () => {
        try {
          setProgress(playback.progress_ms!)
          setDuration(trackState.duration_ms!)
          const percentage = Math.floor((progress / duration) * 100)
          setPercentage(percentage)
        } catch (error) {
          console.error((error as any).message)
        }
      })()
    }
  }, [playback])

  async function handleShuffle () {
    try {
      await spotifyApi.setShuffle(!playback?.shuffle_state)
    } catch (error) {
      console.error((error as any).message)
    }
  }

  async function handlePrevious () {
    try {
      percentage > 3 ? await spotifyApi.seek(0) : await spotifyApi.skipToPrevious()
    } catch (error) {
      console.error((error as any).message)
    }
  }

  async function handlePlayPause () {
    try {
      !playback.is_playing! ? await spotifyApi.play({}) : await spotifyApi.pause()
    } catch (error) {
      console.error((error as any).message)
    }
  }

  async function handleNext () {
    try {
      await spotifyApi.skipToNext()
    } catch (error) {
      console.error((error as any).message)
    }
  }

  async function handleVolume (value: number[]) {
    try {
      await spotifyApi.setVolume(value[0])
    } catch (error) {
      console.error((error as any).message)
    }
  }

  async function handleChangeProgress (value: number[]) {
    const positionMs = Number(value[0])
    try {
      await spotifyApi.seek(positionMs)
      setPercentage(positionMs)
    } catch (error) {
      console.error((error as any).message)
    }
  }

  return (
    <footer className="flex px-10 items-center justify-between fixed z-50 bottom-0 p-2 border-t border-t-zinc-700 w-full bg-zinc-800 h-[8vh]">
      <div className="flex gap-2 w-80">
        {!!trackState && (
          <>
            <Image
              src={trackState?.album?.images[0]?.url}
              alt='music image album'
              width={200}
              height={200}
              className="w-14 h-14 object-contain"
            />
            <div className="mt-1">
              <h4 className="truncate w-80 font-semibold hover:underline">
                <Link href={`/album/${trackState.album?.id}`}>{trackState?.name}</Link>
              </h4>
              <span className="text-sm whitespace-nowrap flex gap-1">
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
          <SecondaryButton onClick={handleShuffle}>
            <FaRandom
              title="Aleatório"
              className={`${playback?.shuffle_state ? 'text-green-500' : ''}`}
            />
          </SecondaryButton>
          <SecondaryButton onClick={handlePrevious}>
            <FaStepBackward title="Voltar" />
          </SecondaryButton>
          <PrimaryButton onClick={handlePlayPause}>
            {!playback?.is_playing
              ? (
              <FaPlay title="Play" className="ml-1" />
                )
              : (
              <FaPause title="Pausar" />
                )}
          </PrimaryButton>
          <SecondaryButton onClick={handleNext}>
            <FaStepForward title="Avançar" />
          </SecondaryButton>
          <RepeatComponent />
        </div>
        <div className="flex gap-2 items-center justify-center">
          <span className="text-xs">{formatHelper.formatDuration(progress)}</span>
          <Slider.Root
            className="group/progress relative flex items-center w-80 h-5"
            onValueChange={handleChangeProgress}
            aria-label="Music-progress"
            value={[progress]}
            max={duration}
            step={1}
          >
            <Slider.Track className="bg-blackA10 relative grow rounded-full h-1 bg-zinc-400">
              <Slider.Range className="absolute bg-white group-hover/progress:bg-green-400 rounded-full h-full" />
            </Slider.Track>
            <Slider.Thumb className="block cursor-pointer group-hover/progress:w-3 group-hover/progress:h-3 bg-white rounded-[10px] outline-none" />
          </Slider.Root>
          <span className="text-xs">{formatHelper.formatDuration(duration)}</span>
        </div>
      </div>
      <div className="flex gap-6 items-center">
        <Slider.Root
          className="group/volume relative flex items-center w-20 h-5"
          onValueChange={handleVolume}
          aria-label="Volume"
          value={[playback?.device?.volume_percent as number]}
          step={1}
        >
          <Slider.Track className="bg-blackA10 relative grow rounded-full h-1 bg-zinc-400">
            <Slider.Range className="absolute bg-white group-hover/volume:bg-green-400 rounded-full h-full" />
          </Slider.Track>
          <Slider.Thumb className="block cursor-pointer group-hover/volume:w-3 group-hover/volume:h-3 bg-white rounded-[10px] outline-none" />
        </Slider.Root>
        <DevicesPopover />
      </div>
    </footer>
  )
}

function RepeatComponent () {
  const { playback } = useGlobal()
  const { spotifyApi } = useSpotify()

  async function handleRepeat () {
    switch (playback.repeat_state) {
      case 'off':
        await spotifyApi.setRepeat('context')
        break
      case 'track':
        await spotifyApi.setRepeat('off')
        break
      case 'context':
        await spotifyApi.setRepeat('track')
    }
  }

  if (playback?.repeat_state === 'context') {
    return (
      <SecondaryButton onClick={handleRepeat}>
        <FaReplyAll title="Repetir uma faixa" className="text-green-500" />
      </SecondaryButton>
    )
  }

  if (playback?.repeat_state === 'track') {
    return (
      <SecondaryButton onClick={handleRepeat}>
        <FaReply title="Não repetir" className="text-green-500" />
      </SecondaryButton>
    )
  }

  return (
    <SecondaryButton onClick={handleRepeat}>
      <FaReplyAll title="Repetir" />
    </SecondaryButton>
  )
}
