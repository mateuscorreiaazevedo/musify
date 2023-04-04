import * as Popover from '@radix-ui/react-popover'
import React from 'react'

export const PopoverUI = ({ children }: {children: React.ReactNode}) => {
  return (
    <Popover.Portal>
      <Popover.Content className='relative z-40'>
        {children}
      </Popover.Content>
    </Popover.Portal>
  )
}
