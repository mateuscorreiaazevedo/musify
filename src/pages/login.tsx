import { ClientSafeProvider, getProviders, signIn } from 'next-auth/react'
import { GetServerSideProps } from 'next'
import React from 'react'
import Image from 'next/image'
import { toast } from 'react-toastify'

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
    <div className='w-full h-screen flex items-center justify-center'>
      <section className='flex flex-col items-center gap-10'>
        <Image
          src='https://cdn.worldvectorlogo.com/logos/spotify-2.svg'
          alt='Spotify logo'
          width={100}
          height={100}
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

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders()

  return {
    props: {
      providers
    }
  }
}
