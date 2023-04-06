import React from 'react'

type Props = React.InputHTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode
}

export const SecondaryButton = ({ children, ...rest }: Props) => {
  return (
    <div
    className='flex cursor-pointer items-center justify-center text-xl text-zinc-400 hover:text-white active:text-zinc-500'
    {...rest}
    >
      {children}
    </div>
  )
}
