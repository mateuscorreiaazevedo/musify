import { useScroll, useTransform, motion } from 'framer-motion'
import { signOut, useSession } from 'next-auth/react'
import * as Popover from '@radix-ui/react-popover'
import { IoMdArrowDropdown } from 'react-icons/io'
import { PopoverUI } from '@/main/ui'
import Image from 'next/image'
import React from 'react'

const inputRange = [0, 300, 700]

export const Header = () => {
  const { data: session } = useSession()
  const { scrollY } = useScroll()
  const background = useTransform(
    scrollY,
    inputRange,
    ['transparent', 'transparent', 'rgba(50, 50, 50, 0.8)']
  )
  const backdropFilter = useTransform(
    scrollY,
    inputRange,
    ['none', 'none', 'blur(6px)']
  )

  return (
    <motion.header style={{ background, backdropFilter }} className="sticky z-20 top-0 w-full h-20 flex items-center justify-between">
      <div className="w-full" />
      <Popover.Root>
        <Popover.Trigger>
          <ul className='mr-10 pr-4 hover:bg-zinc-800 transition-colors w-52 flex gap-2 bg-black rounded-full p-0.5 items-center justify-between'>
            {session?.user?.image && (
              <Image
                src={session.user.image}
                alt={session.user.name!}
                width={100}
                height={100}
                className='w-9 rounded-full'
              />
            )}
            <h3 className='truncate font-semibold'>
              {session?.user?.name}
            </h3>
            <IoMdArrowDropdown className='text-3xl' />
          </ul>
        </Popover.Trigger>
        <PopoverUI>
          <nav className='w-52 mr-10 mt-2 rounded-lg py-4 px-1 h-full bg-zinc-800'>
            <ul className='flex flex-col gap-2 items-start justify-start'>
              <li className='w-full'>
                <button
                  className='hover:bg-zinc-700 w-full text-start py-1 px-2 rounded-lg transition-colors'
                  onClick={() => signOut({ callbackUrl: '/login' })}
                >
                  Sair
                </button>
              </li>
            </ul>
          </nav>
        </PopoverUI>
      </Popover.Root>
    </motion.header>
  )
}
