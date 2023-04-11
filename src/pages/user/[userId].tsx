import { formatHelper } from '@/modules/core'
import { useUser } from '@/modules/user'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'

export default function User () {
  const { query } = useRouter()
  const { user, loadUser } = useUser(query.userId as string)

  const followers = formatHelper.formatNumber(user.followers?.total as number)

  if (loadUser) {
    return (
      <>
        <Head>
          <title>Musify</title>
        </Head>
      </>
    )
  }

  return (
    <>
      <div className="absolute inset-0 pl-64 h-2/3 bg-gradient-to-b from-[#505050] to-transparent" />
      <Head>
        <title>{user.display_name} • Musify</title>
      </Head>
      <article className="relative">
        <section className="mt-20 gap-4 flex justify-start items-end">
          {user.images && (
            <img
              src={user.images[0].url}
              alt={user.display_name!}
              className="w-60 h-60 object-cover shadow-2xl rounded-full"
            />
          )}
          <div>
            <p className="w-full pr-44 pt-2 text-justify font-bold capitalize">{user.type}</p>
            <h1 className="text-5xl font-bold">{user.display_name}</h1>
            {user.followers?.total as number > 0 && (
              <p className="w-full pr-44 pt-2 text-justify">{followers} seguidores</p>
            )}
          </div>
        </section>
      </article>
    </>
  )
}
