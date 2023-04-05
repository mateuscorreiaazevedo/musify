import React from 'react'

type Props = React.InputHTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode
}

export const PrimaryButton = ({ children, ...rest }: Props) => {
  return (
    <div
    className='flex hover:scale-110 items-center justify-center text-xl text-black active:scale-90 h-10 w-10 rounded-full shadow bg-zinc-50 cursor-pointer'
    {...rest}
    >
      {children}
    </div>
  )
}
