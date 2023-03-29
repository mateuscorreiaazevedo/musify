import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MdOutlineWatchLater } from 'react-icons/md'
import React from 'react'
import { transparentize } from 'polished'

interface Props {
  intercectionFuntion?: () => Promise<void>
  children: React.ReactNode
  primaryColor?: string
}

const inputRange = [200, 400, 500]

export const Table = ({ primaryColor: color, children, intercectionFuntion }: Props) => {
  const { ref, inView } = useInView()
  const { scrollY } = useScroll()
  let primaryColor
  let backdropFilter

  if (color) {
    primaryColor = useTransform(scrollY, inputRange, [
      transparentize(1, color),
      transparentize(0.9, color),
      transparentize(0.1, color)
    ])
    backdropFilter = useTransform(scrollY, inputRange, ['none', 'blur(1px)', 'blur(6px)'])
  }
  const background = useTransform(scrollY, inputRange, ['transparent', transparentize(1, '#222222'), '#222222'])
  const borderColor = useTransform(scrollY, inputRange, ['transparent', transparentize(1, '#434343'), '#434343'])

  if (intercectionFuntion) {
    React.useEffect(() => {
      if (inView) {
        intercectionFuntion()
      }
    }, [inView])
  }

  return (
    <section className="mt-48 mb-24">
      <motion.div
        transition={{ duration: 1.5 }}
        style={{ background: primaryColor, backdropFilter }}
        className="fixed left-60 top-0 w-full h-20"
      />
      <motion.div
        transition={{ duration: 1.5 }}
        style={{ background, borderBottomColor: borderColor }}
        className="fixed left-60 top-20 w-full h-10 border-b"
      />
      <table className="w-full font-semibold text-zinc-500">
        <thead className="sticky top-20 border-b border-b-zinc-700 h-10 text-zinc-300 pl-2">
          <tr>
            <td className="pl-4">#</td>
            <td>Título</td>
            <td>Álbum</td>
            <td className='w-40'>Adicionada em</td>
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
