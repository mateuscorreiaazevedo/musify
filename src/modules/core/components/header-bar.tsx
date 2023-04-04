import { motion, useScroll, useTransform } from 'framer-motion'
import { transparentize } from 'polished'
import React from 'react'
import { inputRange } from '../constants'

type Props = {
  color?: string
  asDuotone?: boolean
}

export const HeaderBar = ({ color = '#111', asDuotone = false }: Props) => {
  const { scrollY } = useScroll()
  const range = asDuotone ? inputRange : [0, 10, 100]
  const opacity = asDuotone ? transparentize(0.2, color) : color

  const background = useTransform(scrollY, range, ['transparent', transparentize(1, color), opacity])
  const backdropFilter = useTransform(scrollY, range, ['none', 'blur(1px)', 'blur(6px)'])

  return (
    <motion.div
        transition={{ duration: 1.5 }}
        style={{ background, backdropFilter }}
        className="fixed left-60 z-10 top-0 w-full h-20"
      />
  )
}
