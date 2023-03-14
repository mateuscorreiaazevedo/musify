import Head from 'next/head'
import React from 'react'

export const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <title>Home | Musify</title>
      </Head>
      sidebar header
      <main>{children}</main>
      footer
    </>
  )
}
