import {
  BsBookmark,
  BsBookmarkFill,
  BsHeart,
  BsHeartFill,
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
    iconFill: BsHeartFill,
    iconOut: BsHeart,
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
