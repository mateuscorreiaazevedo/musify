import { motion, useScroll, useTransform } from 'framer-motion'
import { transparentize } from 'polished'
import React from 'react'

export const HeaderBar = () => {
  const { scrollY } = useScroll()

  const background = useTransform(scrollY, [0, 10, 100], ['transparent', transparentize(1, '#111'), '#111'])
  const backdropFilter = useTransform(scrollY, [0, 10, 100], ['none', 'blur(1px)', 'blur(6px)'])

  return (
    <motion.div
        transition={{ duration: 1.5 }}
        style={{ background, backdropFilter }}
        className="fixed left-60 z-10 top-0 w-full h-20"
      />
  )
}
