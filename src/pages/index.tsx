import { signOut } from 'next-auth/react'
import React from 'react'

function Home () {
  return (
    <>
      <h1 onClick={() => signOut({ callbackUrl: '/login' })}>Hello World</h1>
    </>
  )
}

export default Home
