import { BsHouse, BsHouseFill } from 'react-icons/bs'
import { RiSearchFill, RiSearchLine } from 'react-icons/ri'
import { MdLibraryMusic, MdOutlineLibraryMusic } from 'react-icons/md'

export default [
  {
    iconFill: BsHouseFill,
    iconOut: BsHouse,
    link: '/',
    label: 'home'
  },
  {
    iconFill: RiSearchFill,
    iconOut: RiSearchLine,
    link: '/search',
    label: 'Buscar'
  },
  {
    iconFill: MdLibraryMusic,
    iconOut: MdOutlineLibraryMusic,
    link: '/collection/playlists',
    label: 'sua biblioteca'
  }
]
