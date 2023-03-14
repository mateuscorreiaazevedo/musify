import Head from 'next/head'
import React from 'react'

export const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <title>Home | Musify</title>
      </Head>
      <div className='w-full h-screen bg-zinc-900'>
        sidebar header
        <main>{children}</main>
        footer
      </div>
    </>
  )
}
