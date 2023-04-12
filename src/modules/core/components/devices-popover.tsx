import { BsLaptop, BsSpeaker } from 'react-icons/bs'
import * as Popover from '@radix-ui/react-popover'
import { useSession } from 'next-auth/react'
import { useGlobal, useSpotify } from '..'
import { MdDevices } from 'react-icons/md'
import { toast } from 'react-toastify'
import { PopoverUI } from '@/main/ui'
import React from 'react'

export const DevicesPopover = () => {
  const [devices, setDevices] = React.useState<SpotifyApi.UserDevice[]>([])
  const { data: session } = useSession()
  const { spotifyApi } = useSpotify()
  const { playback } = useGlobal()

  const currentDevice = playback.device?.id

  React.useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      (async () => {
        try {
          const { body } = await spotifyApi.getMyDevices()
          setDevices(body.devices)
        } catch (error) {
          console.error((error as any).message)
          toast.error((error as any).message)
        }
      })()
    }
  }, [session, spotifyApi])

  async function handleDevice (device: SpotifyApi.UserDevice) {
    try {
      await spotifyApi.transferMyPlayback([device.id as string])
    } catch (error) {
      console.error((error as any).message)
      toast.error((error as any).message)
    }
  }

  return (
    <Popover.Root>
      <Popover.Trigger>
        <MdDevices className="text-xl" title="Dispositivos" />
      </Popover.Trigger>
      <PopoverUI>
        <nav className="w-52 mr-10 mb-10 rounded-lg py-4 px-1 h-full bg-zinc-700">
          <ul className="flex flex-col gap-2 items-start justify-start">
            {devices.map(device => (
              <li key={device.id} className="w-full" onClick={() => handleDevice(device)}>
                <button className="hover:bg-zinc-600 w-full text-start py-1 px-2 rounded-lg transition-colors">
                  <span
                    className={`flex items-center justify-start gap-2 ${
                      currentDevice === device?.id ? 'text-green-400' : ''
                    }`}
                  >
                    {device.type === 'Computer' && <BsLaptop className='text-lg w-5 h-5' />}
                    {device.type === 'Speaker' && <BsSpeaker className='text-lg w-5 h-5' />}
                    <span className='truncate'>{device.name}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </PopoverUI>
    </Popover.Root>
  )
}
