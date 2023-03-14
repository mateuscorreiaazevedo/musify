import Head from 'next/head'
import React from 'react'

export const UnauthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <title>Login | Musify</title>
      </Head>
      <main>{children}</main>
    </>
  )
}
