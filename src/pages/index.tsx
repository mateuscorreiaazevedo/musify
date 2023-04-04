import { greeting } from '@/modules/core'
import React from 'react'

export default function Home () {
  return (
    <>
      <h1 className="text-4xl font-bold">{greeting}</h1>
    </>
  )
}
