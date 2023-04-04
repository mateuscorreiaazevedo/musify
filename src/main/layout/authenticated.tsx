import { Header, Player, Sidebar } from '@/modules/core'
import Head from 'next/head'
import React from 'react'

export const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <title>Home • Musify</title>
      </Head>
      <Sidebar />
      <Header />
      <main className="pl-64 pr-4">{children}</main>
      <Player />
    </>
  )
}
