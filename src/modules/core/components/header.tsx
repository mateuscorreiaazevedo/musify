import { IoMdArrowDropdown, IoIosArrowBack } from 'react-icons/io'
import { HeaderCollection } from './header-collection'
import { signOut, useSession } from 'next-auth/react'
import * as Popover from '@radix-ui/react-popover'
import { SearchBar } from './search-bar'
import { useRouter } from 'next/router'
import { PopoverUI } from '@/main/ui'
import Image from 'next/image'
import React from 'react'

export const Header = () => {
  const { data: session } = useSession()
  const { pathname, back } = useRouter()

  return (
    <header className="sticky z-20 top-0 w-full h-20 flex items-center justify-between">
      <div className="w-full pl-64 flex items-center">
        <div className='flex gap-2 items-center'>
          <IoIosArrowBack
            className='bg-black cursor-pointer text-3xl w-10 h-10 p-1 rounded-full text-white'
            onClick={back}
          />
        </div>
        {pathname === '/search' && <SearchBar />}
        {pathname.includes('/collection') && pathname !== '/collection/tracks' && <HeaderCollection />}
      </div>
      <Popover.Root>
        <Popover.Trigger>
          <ul className="mr-10 pr-4 hover:bg-zinc-800 transition-colors w-52 flex gap-2 bg-black rounded-full p-0.5 items-center justify-between">
            {session?.user?.image && (
              <Image
                src={session.user.image}
                alt={session.user.name!}
                width={100}
                height={100}
                className="w-9 rounded-full"
              />
            )}
            <h3 className="truncate font-semibold">{session?.user?.name}</h3>
            <IoMdArrowDropdown className="text-3xl" />
          </ul>
        </Popover.Trigger>
        <PopoverUI>
          <nav className="w-52 mr-10 mt-2 rounded-lg py-4 px-1 h-full bg-zinc-800">
            <ul className="flex flex-col gap-2 items-start justify-start">
              <li className="w-full">
                <button
                  className="hover:bg-zinc-700 w-full text-start py-1 px-2 rounded-lg transition-colors"
                >
                  <a href="https://linkedin.com/in/mateuscorreiaazevedo" target='_blank' rel="noreferrer">
                  LinkedIn
                  </a>
                </button>
              </li>
              <li className="w-full">
                <button
                  className="hover:bg-zinc-700 w-full text-start py-1 px-2 rounded-lg transition-colors"
                >
                  <a href="https://instagram.com/mateuscorreiaazevedo" target='_blank' rel="noreferrer">
                  Instagram
                  </a>
                </button>
              </li>
              <li className="w-full">
                <button
                  className="hover:bg-zinc-700 w-full text-start py-1 px-2 rounded-lg transition-colors"
                >
                  <a href="https://github.com/mateuscorreiaazevedo" target='_blank' rel="noreferrer">
                  Github
                  </a>
                </button>
              </li>
              <li className="w-full">
                <button
                  className="hover:bg-zinc-700 w-full text-start py-1 px-2 rounded-lg transition-colors"
                >
                  <a href="https://mateusdev.com.br" target='_blank' rel="noreferrer">
                  Portfólio
                  </a>
                </button>
              </li>
              <li className="w-full">
                <button
                  className="hover:bg-zinc-700 w-full text-start py-1 px-2 rounded-lg transition-colors"
                  onClick={() => signOut({ callbackUrl: '/login' })}
                >
                  Sair
                </button>
              </li>
            </ul>
          </nav>
        </PopoverUI>
      </Popover.Root>
    </header>
  )
}
