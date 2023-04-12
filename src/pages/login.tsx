import { ClientSafeProvider, getProviders, signIn } from 'next-auth/react'
import { authOptions } from './api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import { GetServerSideProps } from 'next'
import { toast } from 'react-toastify'
import Image from 'next/image'
import React from 'react'

type Props = {
  providers: Awaited<ReturnType<typeof getProviders>>
}

export default function Login ({ providers }: Props) {
  const { name, id } = providers?.spotify as ClientSafeProvider

  async function handleLogin () {
    const response = await signIn(id, { callbackUrl: '/' })

    if (response?.error) {
      toast.error(response.error)
    }
  }

  return (
    <div className='w-full bg-black h-screen flex items-center justify-center'>
      <section className='flex flex-col items-center gap-10'>
        <Image
          src='https://cdn.worldvectorlogo.com/logos/spotify-2.svg'
          alt='Spotify logo'
          width={200}
          height={200}
          loading='lazy'
          className='w-40'
        />
        <button
          className='bg-[#1ed760] hover:bg-[#1db954] transition-colors px-4 py-2 rounded-md text-xl font-semibold'
          onClick={handleLogin}
        >
          Acessar com {name}
        </button>
      </section>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions)
  const providers = await getProviders()

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      providers
    }
  }
}
