import { motion, useScroll, useTransform } from 'framer-motion'
import { FaPlay } from 'react-icons/fa'
import React from 'react'

type Props = {
  handlePlayLikedMusics: () => void
  label: string
}

const inputRange = [
  0,
  0,
  200
]

export const ButtonPlay = ({ handlePlayLikedMusics, label }: Props) => {
  const { scrollY } = useScroll()

  const opacity = useTransform(scrollY, inputRange, [0, 0, 1])
  const x = useTransform(scrollY, inputRange, [25, 25, 100])
  const y = useTransform(scrollY, inputRange, [25, 25, -80])
  const scale = useTransform(scrollY, inputRange, [1.2, 1, 1])

  return (
    <motion.section style={{ x, y }} className="sticky w-[550px] top-20 h-20 mt-20 flex items-center gap-4 z-20">
      <motion.div
        style={{ scale }}
        className="bg-green-500 cursor-pointer flex w-16 h-16 items-center justify-center rounded-full"
        onClick={handlePlayLikedMusics}
      >
        <FaPlay className="text-2xl fill-zinc-900" />
      </motion.div>
      <motion.h2 style={{ opacity }} className="truncate w-96 text-2xl font-bold">{label}</motion.h2>
    </motion.section>
  )
}
