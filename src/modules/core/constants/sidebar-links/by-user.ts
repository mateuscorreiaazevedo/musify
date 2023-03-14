import {
  BsBookmark,
  BsBookmarkFill,
  BsBookmarkHeart,
  BsBookmarkHeartFill,
  BsPlusSquare,
  BsPlusSquareFill
} from 'react-icons/bs'

export default [
  {
    iconFill: BsPlusSquareFill,
    iconOut: BsPlusSquare,
    link: '/playlist/new',
    label: 'criar playlist'
  },
  {
    iconFill: BsBookmarkHeartFill,
    iconOut: BsBookmarkHeart,
    link: '/collection/tracks',
    label: 'músicas curtidas'
  },
  {
    iconFill: BsBookmarkFill,
    iconOut: BsBookmark,
    link: '/collection/episodes',
    label: 'seus episódios'
  }
]
