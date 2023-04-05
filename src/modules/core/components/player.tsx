import {
  FaLaptop,
  FaPause,
  FaPlay,
  FaRandom,
  FaReply,
  FaReplyAll,
  FaStepBackward,
  FaStepForward,
  FaVolumeDown,
  FaVolumeUp
} from 'react-icons/fa'
import { PopoverUI, PrimaryButton, SecondaryButton } from '@/main/ui'
import { useGlobal, formatHelper, useSpotify, useDevices } from '..'
import * as Progress from '@radix-ui/react-progress'
import * as Popover from '@radix-ui/react-popover'
import { BiDevices } from 'react-icons/bi'
import Link from 'next/link'
import React from 'react'
import { BsSpeaker } from 'react-icons/bs'

export const Player = () => {
  const { playback, player, trackState, currentDevice } = useGlobal()
  const [percentage, setPercentage] = React.useState(0)
  const [progress, setProgress] = React.useState(0)
  const [duration, setDuration] = React.useState(0)
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

  return (
    <footer className="flex px-10 items-center justify-between fixed z-50 bottom-0 p-2 border-t border-t-zinc-700 w-full bg-zinc-800 h-[8vh]">
      <div className="flex gap-2 w-60">
        {trackState && (
          <>
            <img src={trackState?.album?.images[0]?.url} className="w-14 h-14 object-contain" />
            <div className="mt-1">
              <h4 className="whitespace-nowrap font-semibold hover:underline">
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
        <div className="flex gap-2 items-center justify-center">
          <span className="text-xs">{formatHelper.formatDuration(progress)}</span>
          <Progress.Root
            className="relative overflow-hidden bg-zinc-400 rounded-full w-80 h-1"
            value={percentage}
          >
            <Progress.Indicator
              className="bg-green-400 w-full h-full transition-transform ease-linear"
              style={{ transform: `translateX(-${100 - percentage}%)` }}
            />
          </Progress.Root>
          <span className="text-xs">{formatHelper.formatDuration(duration)}</span>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <SecondaryButton
          onClick={() => player?.volumeDown(currentDevice.volume_percent!)}
          onDoubleClick={() => player?.volumeDown(currentDevice.volume_percent!)}
        >
          <FaVolumeDown title="Diminuir volume" />
        </SecondaryButton>
        <SecondaryButton
          onClick={() => player?.volumeUp(currentDevice.volume_percent!)}
          onDoubleClick={() => player?.volumeUp(currentDevice.volume_percent!)}
        >
          <FaVolumeUp title="Aumentar volume" />
        </SecondaryButton>
        <DeviceFunction />
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

function DeviceFunction () {
  const { devices } = useDevices()
  return (
    <Popover.Root>
      <Popover.Trigger>
        <SecondaryButton>
          <BiDevices title="Dispositivos" />
        </SecondaryButton>
      </Popover.Trigger>
      <PopoverUI>
        <nav className="w-80 mr-10 mb-10 rounded-lg py-4 px-1 h-full bg-zinc-800">
          <ul className="flex flex-col gap-2 items-start justify-start">
            {devices.map(device => (
              <li key={device.id} className="px-2 py-1 w-full flex items-center gap-2">
                {device.type === 'Computer' && <FaLaptop />}
                {device.type === 'Speaker' && <BsSpeaker />}
                {device.name}
              </li>
            ))}
          </ul>
        </nav>
      </PopoverUI>
    </Popover.Root>
  )
}
