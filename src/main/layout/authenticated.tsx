import { Sidebar } from '@/modules/core'
import Head from 'next/head'
import React from 'react'

export const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <title>Home | Musify</title>
      </Head>
      <div className="w-full h-screen bg-zinc-900">
        <Sidebar />
        <main className='pl-64'>
          header
          {children}
          footer
        </main>
      </div>
    </>
  )
}
