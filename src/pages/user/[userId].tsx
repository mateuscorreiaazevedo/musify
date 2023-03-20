import { useRouter } from 'next/router'
import React from 'react'

export default function User () {
  const { query } = useRouter()

  return (
    <div>User</div>
  )
}
