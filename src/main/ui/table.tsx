import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MdOutlineWatchLater } from 'react-icons/md'
import React from 'react'
import { transparentize } from 'polished'
import { inputRange } from '@/modules/core'
import { useSession } from 'next-auth/react'

interface Props {
  intercectionFuntion?: () => Promise<void>
  children: React.ReactNode
  primaryColor?: string
}

export const Table = ({ primaryColor: color, children, intercectionFuntion }: Props) => {
  const [scrollY, setScrollY] = React.useState(0)
  const { scrollY: framerScroll } = useScroll()
  const { data: session } = useSession()
  const { ref, inView } = useInView()
  let primaryColor
  let backdropFilter

  if (color) {
    primaryColor = useTransform(framerScroll, inputRange, [
      transparentize(1, color),
      transparentize(0, color),
      transparentize(0, color)
    ])
    backdropFilter = useTransform(framerScroll, inputRange, ['none', 'blur(1px)', 'blur(6px)'])
  }

  if (intercectionFuntion) {
    React.useEffect(() => {
      if (inView) {
        intercectionFuntion()
      }
    }, [inView])
  }

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
    <section className="mt-20 mb-24 min-h-full pb-16">
      <motion.div
        transition={{ duration: 1.5 }}
        style={{ background: primaryColor, backdropFilter }}
        className="fixed left-60 z-10 top-0 w-full h-20"
      />
      {scrollY >= 510 && (
        <div className="fixed left-60 top-20 w-full z-10 border-b border-b-zinc-700 h-10 transition-all bg-zinc-800" />
      )}
      <table className="w-full font-semibold text-zinc-500">
        <thead className="sticky z-10 top-20 border-b border-b-zinc-700 h-10 text-zinc-300 pl-2">
          <tr>
            <td className="pl-4">#</td>
            <td>Título</td>
            <td>Álbum</td>
            <td className="w-40">Adicionada em</td>
            <td>
              <MdOutlineWatchLater className="pl-2 text-3xl" />
            </td>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
      <div ref={ref} />
    </section>
  )
}
