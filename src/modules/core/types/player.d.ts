interface PlayerProps {
  play: () => Promise<void>
  pause: () => Promise<void>
  next: () => Promise<void>
  previous: () => Promise<void>
  shuffle: () => Promise<void>
  repeat: () => Promise<void>
  seek: () => Promise<void>
}
