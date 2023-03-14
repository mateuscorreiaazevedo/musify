import { useRouter } from 'next/router'
import React from 'react'
import { AuthenticatedLayout } from './authenticated'
import { UnauthenticatedLayout } from './unauthenticated'

const unauthenticatedRoutes = ['/login']

export const Layout = ({ children }: {children: React.ReactNode}) => {
  const { pathname } = useRouter()

  const isUnauthenticated = unauthenticatedRoutes.find(route => pathname.includes(route))

  if (isUnauthenticated) {
    return (
      <UnauthenticatedLayout>
        {children}
      </UnauthenticatedLayout>
    )
  }

  return (
    <AuthenticatedLayout>
      {children}
    </AuthenticatedLayout>
  )
}
