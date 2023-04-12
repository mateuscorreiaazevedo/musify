import { FaPlay } from 'react-icons/fa'
import React from 'react'
import { useSession } from 'next-auth/react'

type Props = {
  handlePlayLikedMusics: () => void
  label: string
}

export const ButtonPlay = ({ handlePlayLikedMusics, label }: Props) => {
  const [scrollY, setScrollY] = React.useState(0)
  const { data: session } = useSession()

  const onScroll = React.useCallback(() => {
    const { pageYOffset } = window
    setScrollY(Math.floor(pageYOffset))
  }, [])

  React.useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll, { capture: true })
    }
  }, [session])

  return (
    <>
      <section
        className={`fixed top-0 w-[550px] ml-20 h-20 flex items-center gap-4 z-20 transition-all duration-300 ${
          scrollY >= 400 ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div
          className="bg-green-500 cursor-pointer flex w-14 h-14 items-center justify-center rounded-full"
          onClick={handlePlayLikedMusics}
        >
          <FaPlay className="text-2xl ml-1 fill-zinc-900" />
        </div>
        <h2
          className={`truncate text-2xl font-bold ${
            scrollY >= 400 ? 'opacity-100 w-96' : 'opacity-0 w-0'
          }`}
        >
          {label}
        </h2>
      </section>
      <section className={'ml-10 w-[550px] h-20 mt-20 gap-4 z-20 transition-all'}>
        <div
          className="bg-green-500 cursor-pointer flex w-16 h-16 items-center justify-center rounded-full"
          onClick={handlePlayLikedMusics}
        >
          <FaPlay className="text-2xl ml-1 fill-zinc-900" />
        </div>
      </section>
    </>
  )
}
