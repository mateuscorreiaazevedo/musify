import { BsSearch, BsX } from 'react-icons/bs'
import { useRouter } from 'next/router'
import React from 'react'

export const SearchBar = () => {
  const [search, setSearch] = React.useState('')
  const { push, pathname } = useRouter()

  React.useEffect(() => {
    if (search.length) {
      push({
        pathname,
        query: {
          q: search
        }
      })
    } else if (!search.length) push({ pathname })
  }, [search])

  return (
    <>
      <div className="ml-10 h-10 w-96 rounded-full text-black flex gap-2 items-center bg-white px-4">
        <BsSearch className="fill-black text-3xl" />
        <input
          value={search}
          name="search"
          placeholder="O que deseja ouvir?"
          className="outline-none w-full h-full bg-transparent"
          onChange={e => setSearch(e.target.value)}
        />
        <BsX className={`fill-black text-6xl cursor-pointer ${search.length ? 'visible' : 'invisible'}`} onClick={() => setSearch('')} />
      </div>
    </>
  )
}
