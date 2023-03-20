import * as Popover from '@radix-ui/react-popover'
import React from 'react'

export const PopoverUI = ({ children }: {children: React.ReactNode}) => {
  return (
    <Popover.Portal>
      <Popover.Content>
        {children}
      </Popover.Content>
    </Popover.Portal>
  )
}
