import React from 'react'

interface PropsResponse<T> {
  debouncedValue: T
}

export function useDebounce<T> (value: T, delayInMs = 500): PropsResponse<T> {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value)

  React.useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delayInMs)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delayInMs])

  return { debouncedValue }
}
